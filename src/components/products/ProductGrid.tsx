import { ReactNode } from "react"
import Link from "next/link"

interface ProductGridProps {
  children: ReactNode
  isEmpty?: boolean
}

export function ProductGrid({ children, isEmpty = false }: ProductGridProps) {
  if (isEmpty) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 px-4 bg-brand-navy/5 rounded-xl border border-brand-charcoal/10 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-brand-charcoal/30 mb-4"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
        <h3 className="font-serif text-2xl font-bold text-brand-navy mb-2">No products available</h3>
        <p className="text-brand-charcoal/70 mb-6 max-w-md">
          There are currently no products available in this category. Please check back later.
        </p>
        <Link href="/products" className="text-brand-gold hover:text-brand-navy transition-colors font-semibold text-sm underline underline-offset-4">
          View All Products
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  )
}
