import Link from "next/link"
import { PhoneCall } from "lucide-react"

export function ServicesCTA() {
  return (
    <section className="bg-white border-b border-brand-charcoal/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Area */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-ivory/50 flex items-center justify-center shrink-0 border border-brand-gold/20">
              <PhoneCall className="w-6 h-6 text-brand-gold" />
            </div>
            <div className="pt-1">
              <h3 className="font-serif text-2xl font-bold text-brand-navy mb-1">
                Let's Work Together
              </h3>
              <p className="text-brand-charcoal/70 text-sm">
                Looking for a reliable export partner? We are here to help.
              </p>
            </div>
          </div>

          {/* Right Button */}
          <div>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-navy hover:bg-brand-navy hover:text-white rounded-sm font-bold tracking-widest text-xs uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              CONTACT US →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
