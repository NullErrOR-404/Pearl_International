const fs = require('fs');
const { Client } = require('pg');

async function runSQL() {
  const connectionString = 'postgresql://postgres:Mdsameen-2006@db.pgjshnsnkrrgvaxxhouf.supabase.co:5432/postgres';
  const sql = fs.readFileSync('new_tables_only.sql', 'utf8');

  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log("Connected to Supabase Postgres.");
    
    await client.query(sql);
    console.log("SQL executed successfully!");
    
  } catch (error) {
    console.error("Error executing SQL:", error);
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
}

runSQL();
