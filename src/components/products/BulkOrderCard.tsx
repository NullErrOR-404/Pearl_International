import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function BulkOrderCard() {
  return (
    <div className="bg-white rounded-xl border border-brand-charcoal/10 overflow-hidden shadow-sm p-6 flex flex-col items-start mt-6 w-full">
      <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs mb-2">
        LOOKING FOR
      </span>
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-navy mb-4 leading-tight">
        Bulk Orders?
      </h3>
      <p className="text-sm text-brand-charcoal/70 mb-6 leading-relaxed">
        We supply in bulk quantities with custom packaging to meet your export requirements.
      </p>
      <Link 
        href="/contact" 
        className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-bold tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
      >
        CONTACT US <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
