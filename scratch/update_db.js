const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8')
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim()
const supabaseServiceKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim()

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  const { data, error } = await supabase
    .from('categories')
    .update({ image: '/images/category-spices-hero.jpg' })
    .eq('slug', 'spices')
    .select();

  console.log('Update result:', data);
  console.log('Update error:', error);
}

main();
