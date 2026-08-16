import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
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

  try {
    const { data, error } = await supabaseAdmin.from('settings').select('id').limit(1).single();
    
    if (data) {
      await supabaseAdmin.from('settings').update(payload).eq('id', data.id);
      return NextResponse.json({ success: true, message: 'Settings updated' });
    } else {
      await supabaseAdmin.from('settings').insert([payload]);
      return NextResponse.json({ success: true, message: 'Settings inserted' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
