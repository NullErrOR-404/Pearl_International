import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 overflow-x-auto">
      <ol className="flex items-center space-x-2 text-sm text-brand-charcoal/60 whitespace-nowrap">
        <li>
          <Link 
            href="/" 
            className="flex items-center hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-brand-navy/30 shrink-0" aria-hidden="true" />
            {index === items.length - 1 ? (
              <span className="text-brand-navy font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
