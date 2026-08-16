const fs = require('fs')
const env = fs.readFileSync('.env.local', 'utf8')
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim()
const supabaseKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim()

fetch(`${supabaseUrl}/rest/v1/categories?select=*`, {
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`
  }
}).then(r => r.json()).then(data => console.log(JSON.stringify(data, null, 2)))
