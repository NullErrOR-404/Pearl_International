import { redirect } from 'next/navigation'
import { getCategories } from '@/lib/data/categories'

export default async function ProductsIndexPage() {
  const categories = await getCategories();
  
  if (categories && categories.length > 0) {
    redirect(`/products/${categories[0].slug}`);
  } else {
    // Fallback if no categories exist
    redirect(`/`);
  }
}
