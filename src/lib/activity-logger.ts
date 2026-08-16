import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function logActivity(action: string, entity_type: string, entity_id?: string, details?: any) {
  try {
    await supabaseAdmin.from('activity_logs').insert([{
      action,
      entity_type,
      entity_id,
      details
    }])
  } catch (error) {
    console.error("Failed to log activity:", error)
  }
}
