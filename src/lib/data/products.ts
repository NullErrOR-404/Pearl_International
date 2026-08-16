import { supabase } from '../supabase/client'

export interface Product {
  id: string
  category_id: string
  name: string
  slug: string
  short_description: string
  full_description: string
  image: string
  highlights: string[]
  specifications: Record<string, string>
  packaging: string
  status: string
  featured: boolean
  sort_order: number
  is_visible: boolean
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching product ${slug}:`, error)
    }
    return null
  }

  return data as Product
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
    .limit(3)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data as Product[]
}
