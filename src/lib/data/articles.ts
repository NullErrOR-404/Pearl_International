import { supabase } from "@/lib/supabase/client"
import { unstable_cache } from "next/cache"

export const getPublishedArticles = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Error fetching articles:", error)
      return []
    }

    return data
  },
  ['published-articles'],
  { tags: ['articles'] }
)

export const getArticleBySlug = unstable_cache(
  async (slug: string) => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      return null
    }

    return data
  },
  ['article-by-slug'],
  { tags: ['articles'] }
)
