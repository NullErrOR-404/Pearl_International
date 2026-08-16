import { Leaf, Search, Settings, PackageCheck, Truck, Headset } from "lucide-react"

export function ProcessTimeline() {
  const steps = [
    {
      title: "Sourcing",
      desc: "We find the best products from trusted sources.",
      icon: <Leaf className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Inspection",
      desc: "Quality is inspected thoroughly.",
      icon: <Search className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Processing",
      desc: "Products are processed with care and expertise.",
      icon: <Settings className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Packaging",
      desc: "Packed securely to maintain freshness.",
      icon: <PackageCheck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Shipping",
      desc: "Delivered globally with reliability.",
      icon: <Truck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Support",
      desc: "We're here for you, always.",
      icon: <Headset className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    }
  ]

  return (
    <section className="bg-brand-navy py-20 md:py-28 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-brand-navy to-brand-navy pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold/80 text-xs block mb-3 flex items-center justify-center gap-2">
            OUR PROCESS
            <div className="w-8 h-px bg-brand-gold/80"></div>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Simple Steps. Seamless Service.
          </h2>
        </div>

        {/* Timeline Desktop */}
        <div className="hidden lg:grid grid-cols-6 relative">
          
          {/* Connector Line */}
          <div className="absolute top-[40px] left-[8%] right-[8%] h-px border-t border-dashed border-brand-gold/30"></div>

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              
              <div className="w-20 h-20 rounded-full bg-brand-navy flex items-center justify-center border border-brand-gold/30 mb-6 shadow-xl relative">
                {step.icon}
                
                {/* Connecting arrow (not on last item) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-brand-gold/50">
                    <span className="text-sm">→</span>
                  </div>
                )}
              </div>

              <h3 className="font-serif font-bold text-brand-gold mb-2 text-lg">
                {step.title}
              </h3>
              
              <p className="text-brand-ivory/70 text-xs leading-relaxed max-w-[140px]">
                {step.desc}
              </p>

            </div>
          ))}
        </div>

        {/* Timeline Mobile / Tablet (Stacked with vertical line) */}
        <div className="lg:hidden flex flex-col gap-12 relative max-w-sm mx-auto">
          {/* Vertical Connector Line */}
          <div className="absolute left-[39px] top-[40px] bottom-[40px] w-px border-l border-dashed border-brand-gold/30"></div>

          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-6 relative z-10">
              
              <div className="w-20 h-20 shrink-0 rounded-full bg-brand-navy flex items-center justify-center border border-brand-gold/30 shadow-xl relative bg-brand-navy">
                {step.icon}
              </div>

              <div>
                <h3 className="font-serif font-bold text-brand-gold mb-1 text-lg">
                  {step.title}
                </h3>
                <p className="text-brand-ivory/70 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
