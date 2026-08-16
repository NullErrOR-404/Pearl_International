"use server"

import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { getGlobalSettings } from "@/lib/data/settings"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { headers } from "next/headers"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')

// Create a new ratelimiter, that allows 2 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
})

export async function submitInquiry(payload: {
  name: string
  email: string
  phone?: string
  message: string
  turnstileToken: string
}) {
  try {
    // 0. Rate Limiting Check
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") ?? "127.0.0.1"
    const { success: rateLimitSuccess } = await ratelimit.limit(`ratelimit_${ip}`)
    
    if (!rateLimitSuccess) {
      return { success: false, error: "Too many requests. Please try again in a minute." }
    }

    // 0.5. Turnstile Verification
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${payload.turnstileToken}`
    })
    
    const turnstileData = await turnstileRes.json()
    if (!turnstileData.success) {
      return { success: false, error: "Security check failed. Please refresh and try again." }
    }

    // Remove token from payload before inserting to DB
    const { turnstileToken, ...dbPayload } = payload

    // 1. Save to Database
    const { error } = await supabaseAdmin.from('inquiries').insert([dbPayload])
    
    if (error) {
      return { success: false, error: error.message }
    }

    // 2. Fetch target email
    const settings = await getGlobalSettings()
    const targetEmail = settings?.contact_email || 'sameen14nmofficial@gmail.com'

    // 3. Send Notification via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Pearl International Leads <onboarding@resend.dev>',
        to: targetEmail,
        subject: `New Lead: ${payload.name}`,
        html: `
          <h2>New Lead via Website</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
          <hr />
          <h3>Message / Requirements:</h3>
          <p style="white-space: pre-wrap;">${payload.message}</p>
        `
      })
    }
    
    return { success: true }
  } catch (err: any) {
    console.error("Inquiry Error: ", err)
    return { success: false, error: err.message }
  }
}
