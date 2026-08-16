const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:Mdsameen-2006@db.pgjshnsnkrrgvaxxhouf.supabase.co:5432/postgres'
});

async function fixPolicies() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Drop all dangerous policies
    const queries = [
      `DROP POLICY IF EXISTS "Admins can view activity logs" ON public.activity_logs`,
      `DROP POLICY IF EXISTS "Admins can insert activity logs" ON public.activity_logs`,
      `DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries`,
      `DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries`,
      `DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.inquiries`,
      `DROP POLICY IF EXISTS "Admins can view page views" ON public.page_views`,
      `DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views`
    ];

    for (let q of queries) {
      console.log(`Executing: ${q}`);
      await client.query(q);
    }

    // Create locked down policies (Allow public INSERT only)
    const newPolicies = [
      `CREATE POLICY "Anyone can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true)`,
      `CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true)`,
      // Admins (via Service Role Key) bypass RLS completely, so we don't need ANY permissive SELECT/UPDATE policies for them!
    ];

    for (let q of newPolicies) {
      console.log(`Executing: ${q}`);
      await client.query(q);
    }

    await client.query('COMMIT');
    console.log("SUCCESS: Database is now securely locked down.");
  } catch (e) {
    await client.query('ROLLBACK');
    console.error("ERROR:", e);
  } finally {
    client.release();
    pool.end();
  }
}

fixPolicies();
