import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Category } from "@/lib/data/categories"

interface CategorySidebarProps {
  categories: Category[]
  activeCategorySlug: string
}

const getCategoryIcon = (slug: string, isActive: boolean) => {
  const colorClass = isActive ? 'text-brand-gold' : 'text-brand-charcoal/60'
  if (slug.includes('coconut')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colorClass}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
        <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"></circle>
      </svg>
    )
  }
  if (slug.includes('spice')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colorClass}>
        <path d="M3 21c3 0 7-1 10-4s5-7 5-10-3-4-3-4-1 3-4 5-7 5-10 5v8z"></path>
        <path d="M12 17c3 0 6-1 8-3"></path>
      </svg>
    )
  }
  if (slug.includes('vegetable') || slug.includes('onion')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colorClass}>
        <path d="M12 2C8 6 4 10 4 15a8 8 0 0 0 16 0c0-5-4-9-8-13z"></path>
        <path d="M12 2v2"></path>
        <path d="M8 15c0-2.5 1.5-5 4-7"></path>
      </svg>
    )
  }
  // Default Leaf for Agro
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colorClass}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
    </svg>
  )
}

export function CategorySidebar({ categories, activeCategorySlug }: CategorySidebarProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Categories Block */}
      <div className="bg-white rounded-xl border border-brand-charcoal/10 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-charcoal/10">
          <h3 className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm">
            CATEGORIES
          </h3>
        </div>
        
        {/* Navigation List */}
        <nav className="flex flex-col">
          {categories.map((category, idx) => {
            const isActive = category.slug === activeCategorySlug;
            
            return (
              <Link 
                key={category.id} 
                href={`/products/${category.slug}`}
                className={`flex items-center justify-between px-6 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold
                  ${isActive 
                    ? 'bg-brand-navy text-white' 
                    : 'bg-white text-brand-charcoal hover:bg-brand-navy/5'
                  }
                  ${idx !== categories.length - 1 && !isActive && (categories[idx+1]?.slug !== activeCategorySlug) ? 'border-b border-brand-charcoal/10' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Category-specific icon */}
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-colors ${isActive ? 'border-brand-gold bg-white/10' : 'border-brand-charcoal/20 bg-transparent'}`}>
                     {getCategoryIcon(category.slug, isActive)}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-brand-charcoal'}`}>
                    {category.name}
                  </span>
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-brand-gold" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

    </div>
  )
}
