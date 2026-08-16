import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/data/products'
import { getCategories } from '@/lib/data/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.pearlinternational.com'

  const products = await getProducts()
  const categories = await getCategories()

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    '',
    '/about',
    '/products',
    '/quality',
    '/services',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...staticUrls, ...categoryUrls, ...productUrls]
}
