const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres:Mdsameen-2006@db.pgjshnsnkrrgvaxxhouf.supabase.co:5432/postgres'
});

async function run() {
  await client.connect();
  try {
    await client.query(`
      ALTER TABLE public.settings
      ADD COLUMN IF NOT EXISTS contact_email text DEFAULT 'sameen14nmofficial@gmail.com';
    `);
    console.log("Column added successfully!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}
run();
