import { notFound } from "next/navigation"
import { getCategories, getCategoryBySlug } from "@/lib/data/categories"
import { getProductsByCategory } from "@/lib/data/products"
import { ProductPageHero } from "@/components/products/ProductPageHero"
import { CategorySidebar } from "@/components/products/CategorySidebar"
import { BulkOrderCard } from "@/components/products/BulkOrderCard"
import { ClientProductArea } from "@/components/products/ClientProductArea"
import { TrustStrip } from "@/components/products/TrustStrip"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.category);
  if (!category) return { title: 'Not Found' };
  
  return {
    title: `${category.name} - Premium Export | Pearl International`,
    description: category.description || `Browse our premium ${category.name} selection for international export.`,
    openGraph: {
      title: `${category.name} - Pearl International`,
      description: category.description || `Browse our premium ${category.name} selection for international export.`,
      images: category.image ? [{ url: category.image }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - Pearl International`,
      description: category.description || `Browse our premium ${category.name} selection for international export.`,
      images: category.image ? [category.image] : [],
    }
  };
}

export default async function CategoryPage({ 
  params
}: { 
  params: Promise<{ category: string }>
}) {
  const resolvedParams = await params;
  
  const categories = await getCategories();
  const currentCategory = await getCategoryBySlug(resolvedParams.category);
  const categoryName = currentCategory?.name || "Category";

  if (!currentCategory) {
    notFound();
  }
  
  const products = await getProductsByCategory(currentCategory.id);

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA]">
      
      {/* Hero Section */}
      <ProductPageHero category={currentCategory} />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl py-12 lg:py-16">
        
        <Breadcrumbs 
          items={[
            { label: "Products", href: "/products" },
            { label: categoryName, href: `/products/${currentCategory.slug}` }
          ]} 
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-6">
          
          {/* Left Sidebar (Sticky on desktop) */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28">
            <CategorySidebar categories={categories} activeCategorySlug={currentCategory.slug} />
            <BulkOrderCard />
          </aside>

          {/* Right Product Area (Client-side sorted) */}
          <ClientProductArea 
            categoryName={currentCategory.name}
            categorySlug={currentCategory.slug}
            initialProducts={products}
          />

        </div>
      </div>

      {/* Bottom Trust Section */}
      <TrustStrip />

    </div>
  )
}
