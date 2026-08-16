"use server"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function trackPageView(path: string) {
  try {
    // Using anon key, RLS policy allows inserts
    await supabase.from('page_views').insert([{ path }])
  } catch (error) {
    // Silently fail for analytics to not disrupt user experience
    console.error("Analytics error:", error)
  }
}
