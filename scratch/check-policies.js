const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:Mdsameen-2006@db.pgjshnsnkrrgvaxxhouf.supabase.co:5432/postgres'
});

async function checkPolicies() {
  const result = await pool.query(`
    SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
    FROM pg_policies 
    WHERE schemaname = 'public';
  `);
  console.log(JSON.stringify(result.rows, null, 2));
  process.exit(0);
}

checkPolicies().catch(console.error);
