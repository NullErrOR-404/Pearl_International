import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProductCardProps {
  name: string
  slug: string
  description: string
  image: string
  categorySlug: string
}

export function ProductCard({ name, slug, description, image, categorySlug }: ProductCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-md transition-shadow group h-full">
      
      {/* Top Image Area */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-brand-navy/5">
        <Image 
          src={image || "/images/category-spices.webp"} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col p-6 flex-1">
        <h3 className="font-serif text-xl font-bold text-brand-navy mb-2 leading-tight">
          {name}
        </h3>
        <p className="text-sm text-brand-charcoal/70 mb-6 flex-1 leading-relaxed">
          {description || "Premium quality product sourced from the best farms."}
        </p>
        
        {/* Outlined CTA */}
        <Link 
          href={`/products/${categorySlug}/${slug}`} 
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 border border-brand-charcoal/20 text-brand-charcoal text-xs font-bold tracking-widest uppercase rounded-sm group-hover:border-brand-gold group-hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          VIEW DETAILS <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  )
}
