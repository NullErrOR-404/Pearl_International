import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function QualityCTA() {
  return (
    <section className="bg-brand-navy border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-full border-2 border-brand-gold/30 flex items-center justify-center bg-white/5 shrink-0">
              <ShieldCheck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-white text-lg md:text-xl font-sans tracking-tight font-medium leading-relaxed max-w-xl">
                Quality is the foundation of everything we do.
                <br className="hidden md:block" />
                <span className="text-brand-ivory/70 text-base md:text-lg">Partner with us for products you can rely on.</span>
              </p>
            </div>
          </div>

          {/* Right CTA */}
          <div className="shrink-0">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-gold/50 text-brand-gold hover:bg-brand-gold hover:text-brand-navy rounded-sm font-bold tracking-widest text-xs uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              GET IN TOUCH <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
