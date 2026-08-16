import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function ContactCTA() {
  return (
    <section className="bg-brand-ivory/40 border-t border-brand-charcoal/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-full border border-brand-navy/10 flex items-center justify-center bg-white shrink-0 shadow-sm">
              <Mail className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-navy mb-2">
                Have a Question?
              </h3>
              <p className="text-brand-charcoal/70 text-sm md:text-base max-w-md leading-relaxed">
                Our team is ready to assist you with your requirements and provide the best solutions.
              </p>
            </div>
          </div>

          {/* Right Phone CTA */}
          <div className="shrink-0">
            <a 
              href="tel:+919840632263" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-brand-navy/10 hover:border-brand-gold hover:shadow-md rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <div className="flex flex-col items-start">
                <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/50 font-bold leading-none mb-1">CALL US NOW</span>
                <span className="font-serif text-brand-navy font-bold leading-none">+91 9840632263</span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
