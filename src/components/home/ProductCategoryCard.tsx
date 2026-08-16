import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProductCategoryCardProps {
  id: string
  name: string
  slug: string
  description: string
  image: string
}

const getCategoryIcon = (slug: string, className: string) => {
  if (slug.includes('coconut')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
        <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"></circle>
        <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"></circle>
      </svg>
    )
  }
  if (slug.includes('spice')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 21c3 0 7-1 10-4s5-7 5-10-3-4-3-4-1 3-4 5-7 5-10 5v8z"></path>
        <path d="M12 17c3 0 6-1 8-3"></path>
      </svg>
    )
  }
  if (slug.includes('vegetable') || slug.includes('onion')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2C8 6 4 10 4 15a8 8 0 0 0 16 0c0-5-4-9-8-13z"></path>
        <path d="M12 2v2"></path>
        <path d="M8 15c0-2.5 1.5-5 4-7"></path>
      </svg>
    )
  }
  // Default Leaf for Agro
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
    </svg>
  )
}

export function ProductCategoryCard({ name, slug, description, image }: ProductCategoryCardProps) {
  return (
    <div className="flex flex-col group relative bg-brand-ivory rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      
      {/* Top Image Area */}
      <div className="relative h-64 w-full overflow-hidden bg-brand-navy/5">
        {image ? (
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-navy/30 font-serif">
            {name}
          </div>
        )}
      </div>

      {/* Decorative Overlapping Badge */}
      <div className="absolute top-[14rem] left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md z-10">
        {getCategoryIcon(slug, "text-brand-gold")}
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col p-8 pt-12 flex-1 bg-white relative">
        <h3 className="font-serif text-2xl font-bold text-brand-navy mb-3 leading-tight w-2/3">
          {name}
        </h3>
        <p className="text-sm text-brand-charcoal/70 mb-8 flex-1 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        <Link 
          href={`/products/${slug}`} 
          className="text-brand-gold font-bold text-sm tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm w-max"
        >
          VIEW PRODUCTS <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  )
}
