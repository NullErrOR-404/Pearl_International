import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const payload = {
    company_name: 'Pearl International',
    tag_line: 'Premium Agricultural Exports',
    primary_phone: '+91 98406 32263',
    primary_email: 'pearlinternational1010@gmail.com',
    office_address: 'Global Export Hub\nChennai, India',
    facebook_url: 'https://facebook.com',
    instagram_url: 'https://instagram.com',
    linkedin_url: 'https://linkedin.com',
    default_meta_title: 'Pearl International | Quality Agricultural Exports',
    default_meta_description: 'Leading exporter of premium coconuts, spices, and agricultural products.',
  };

  const { data, error } = await supabaseAdmin.from('settings').select('id').limit(1).single();
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching settings:', error);
    return;
  }
  
  if (data) {
    const { error: updateError } = await supabaseAdmin.from('settings').update(payload).eq('id', data.id);
    if (updateError) console.error('Error updating:', updateError);
    else console.log('Successfully updated settings!');
  } else {
    const { error: insertError } = await supabaseAdmin.from('settings').insert([payload]);
    if (insertError) console.error('Error inserting:', insertError);
    else console.log('Successfully inserted settings!');
  }
}

run();
