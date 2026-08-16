import { supabase } from '../supabase/client'

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  is_visible: boolean
  sort_order: number
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') { // PGRST116 is no rows returned
      console.error(`Error fetching category ${slug}:`, error)
    }
    return null
  }

  return data as Category
}
