const fs = require('fs')
const env = fs.readFileSync('.env.local', 'utf8')
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim()
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim()

fetch(`${supabaseUrl}/rest/v1/categories?slug=eq.spices`, {
  method: 'PATCH',
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ image: '/images/category-spices-hero.jpg' })
}).then(r => {
  if (r.ok) console.log('Successfully updated Spices category image.')
  else console.error('Failed to update.')
})
