const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_SERVICE_ROLE_KEY = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1]?.trim();

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function setupSettings() {
  console.log('Creating site_settings table...');
  
  // Create table using SQL via RPC if exists, but we can't easily run arbitrary DDL without a function.
  // Wait, Supabase allows creating tables via the REST API or we can just use the Dashboard. 
  // Since we are using the service role key, we can try to insert a row into 'site_settings' and if it fails because it doesn't exist, we must tell the user to run SQL or we can create it via the REST API if available. 
  // Actually, Supabase provides `pg_graphql` and `postgrest`, neither of which can execute raw DDL (CREATE TABLE) directly from the client without a custom RPC function.
  
  console.log("To create the 'site_settings' table, please run this SQL in your Supabase SQL Editor:");
  console.log(`
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES (
  'global', 
  '{"phone": "+91 98406 32263", "email": "info@pearlinternational.in", "proprietor": "MOHAMMED JUNAID S", "whatsapp": "919840632263", "address": "123 Export Avenue, Chennai, India"}'
) ON CONFLICT (key) DO NOTHING;
  `);
}

setupSettings();
