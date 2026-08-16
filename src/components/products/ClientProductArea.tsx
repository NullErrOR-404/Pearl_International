"use client"

import { useState, useMemo } from "react"
import { ProductToolbar } from "./ProductToolbar"
import { ProductGrid } from "./ProductGrid"
import { ProductCard } from "./ProductCard"

interface ClientProductAreaProps {
  categoryName: string
  categorySlug: string
  initialProducts: any[]
}

export function ClientProductArea({ categoryName, categorySlug, initialProducts }: ClientProductAreaProps) {
  const [sortOption, setSortOption] = useState('popular')

  const sortedProducts = useMemo(() => {
    const products = [...initialProducts]
    if (sortOption === 'asc') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'desc') {
      products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'newest') {
      products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      products.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    }
    return products
  }, [initialProducts, sortOption])

  return (
    <main className="flex-1 w-full min-w-0">
      <ProductToolbar 
        categoryName={categoryName} 
        productCount={sortedProducts.length} 
        currentSort={sortOption}
        onSortChange={setSortOption}
      />
      
      <ProductGrid isEmpty={sortedProducts.length === 0}>
        {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            slug={product.slug}
            description={product.short_description || product.full_description}
            image={product.image}
            categorySlug={categorySlug}
          />
        ))}
      </ProductGrid>
    </main>
  )
}
