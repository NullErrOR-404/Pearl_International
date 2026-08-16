import { Globe, ShieldCheck, Leaf, Factory, Truck } from "lucide-react"

export function TrustStrip() {
  const trusts = [
    {
      icon: <Globe className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />,
      title: "Globally\nExported",
      desc: "Serving 25+ countries\nworldwide."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />,
      title: "Premium\nQuality",
      desc: "Strict quality control at\nevery step."
    },
    {
      icon: <Leaf className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />,
      title: "Naturally\nSourced",
      desc: "Ethically sourced from the\nbest farms."
    },
    {
      icon: <Factory className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />,
      title: "Hygienic\nProcessing",
      desc: "Advanced processing and\nclean packaging."
    },
    {
      icon: <Truck className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />,
      title: "On-time\nDelivery",
      desc: "Timely and safe delivery\nacross the globe."
    }
  ]

  return (
    <section className="bg-brand-navy py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3">
            WHY CHOOSE PEARL INTERNATIONAL
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold">
            Delivering Purity. Building Trust.
          </h2>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x divide-white/10">
          {trusts.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center lg:px-4">
              <div className="mb-4">
                {item.icon}
              </div>
              <h4 className="text-white text-sm font-semibold whitespace-pre-line mb-2 leading-tight">
                {item.title}
              </h4>
              <p className="text-brand-ivory/60 text-xs whitespace-pre-line leading-relaxed max-w-[150px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
