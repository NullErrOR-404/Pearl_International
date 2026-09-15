"use server"

import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { getGlobalSettings } from "@/lib/data/settings"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { headers } from "next/headers"
import { z } from "zod"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')

// Safe initialization of ratelimiter
let ratelimit: Ratelimit | null = null
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "1 m"),
      analytics: true,
    })
  }
} catch {
  // Non-fatal: fall back to graceful processing if Redis configuration is absent
}

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100, "Name cannot exceed 100 characters."),
  email: z.string().trim().email("Please provide a valid email address.").max(255, "Email address is too long."),
  phone: z.string().trim().max(30, "Phone number is too long.").optional().or(z.literal("")),
  message: z.string().trim().min(5, "Message must be at least 5 characters.").max(5000, "Message cannot exceed 5000 characters."),
  turnstileToken: z.string().min(1, "Security verification token is required."),
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function submitInquiry(rawPayload: {
  name: string
  email: string
  phone?: string
  message: string
  turnstileToken: string
}) {
  try {
    // 1. Strict Schema Validation
    const parsed = inquirySchema.safeParse(rawPayload)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input."
      return { success: false, error: firstError }
    }
    const payload = parsed.data

    // 2. Rate Limiting Check
    if (ratelimit) {
      try {
        const headersList = await headers()
        const rawIp = headersList.get("x-forwarded-for") ?? "127.0.0.1"
        const ip = rawIp.split(",")[0].trim()
        const { success: rateLimitSuccess } = await ratelimit.limit(`ratelimit_inquiry_${ip}`)
        
        if (!rateLimitSuccess) {
          return { success: false, error: "Too many requests. Please try again in a minute." }
        }
      } catch (rateLimitErr) {
        console.warn("Rate limit check bypassed due to Redis error:", rateLimitErr)
      }
    }

    // 3. Turnstile Verification
    if (process.env.TURNSTILE_SECRET_KEY) {
      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(process.env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(payload.turnstileToken)}`
      })
      
      const turnstileData = await turnstileRes.json()
      if (!turnstileData.success) {
        return { success: false, error: "Security check failed. Please refresh and try again." }
      }
    }

    // 4. Save to Database (Clean Payload without token)
    const dbPayload = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      message: payload.message,
    }

    const { error: dbError } = await supabaseAdmin.from('inquiries').insert([dbPayload])
    
    if (dbError) {
      console.error("Database inquiry insertion error:", dbError)
      return { success: false, error: "Unable to record inquiry. Please try again later." }
    }

    // 5. Fetch Target Notification Email
    const settings = await getGlobalSettings()
    const targetEmail = settings?.contact_email || 'sameen14nmofficial@gmail.com'

    // 6. Send Sanitized Notification via Resend
    if (process.env.RESEND_API_KEY) {
      const safeName = escapeHtml(payload.name)
      const safeEmail = escapeHtml(payload.email)
      const safePhone = escapeHtml(payload.phone || 'N/A')
      const safeMessage = escapeHtml(payload.message)

      await resend.emails.send({
        from: 'Pearl International Leads <onboarding@resend.dev>',
        to: targetEmail,
        subject: `New Lead: ${safeName}`,
        html: `
          <h2>New Lead via Website</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <hr />
          <h3>Message / Requirements:</h3>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        `
      })
    }
    
    return { success: true }
  } catch (err: any) {
    console.error("Inquiry Submission Error: ", err)
    return { success: false, error: "An unexpected error occurred. Please try again." }
  }
}
