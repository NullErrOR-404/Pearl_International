const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:Mdsameen-2006@db.pgjshnsnkrrgvaxxhouf.supabase.co:5432/postgres'
});

async function setupArticles() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.articles (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        title text NOT NULL,
        slug text NOT NULL UNIQUE,
        excerpt text,
        content text NOT NULL,
        featured_image text,
        author text DEFAULT 'Pearl International',
        status text DEFAULT 'draft',
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);

    // Enable RLS
    await client.query(`ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;`);

    // Drop policies if exist to ensure idempotency
    await client.query(`DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;`);
    
    // Create Policies
    await client.query(`
      CREATE POLICY "Public can view published articles" 
      ON public.articles FOR SELECT 
      USING (status = 'published');
    `);

    await client.query('COMMIT');
    console.log("SUCCESS: Articles table created and secured.");
  } catch (e) {
    await client.query('ROLLBACK');
    console.error("ERROR:", e);
  } finally {
    client.release();
    pool.end();
  }
}

setupArticles();
