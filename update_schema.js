import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const sql = `
    ALTER TABLE settings
    ADD COLUMN IF NOT EXISTS show_social_media BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS show_products BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS show_categories BOOLEAN DEFAULT true;
  `
  
  // Actually, supabase JS client cannot run raw DDL SQL directly unless via an RPC.
  // Wait, I can just write a sql file and tell the user to run it, or use `psql` if available.
  console.log("Cannot run DDL via JS client without RPC. Please run this SQL in Supabase Dashboard:");
  console.log(sql);
}

run()
