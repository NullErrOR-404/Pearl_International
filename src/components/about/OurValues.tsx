import { ShieldCheck, Leaf, Handshake, Globe, Sprout } from "lucide-react"

export function OurValues() {
  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
      title: "Quality First",
      description: "We ensure the highest quality in every product we source and deliver."
    },
    {
      icon: <Leaf className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
      title: "Naturally Sourced",
      description: "Our products are carefully sourced from the best farms and plantations."
    },
    {
      icon: <Handshake className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
      title: "Integrity",
      description: "We believe in honest business practices and transparent relationships."
    },
    {
      icon: <Globe className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
      title: "Customer Focused",
      description: "Our customers' success is our priority. We go beyond expectations."
    },
    {
      icon: <Sprout className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />,
      title: "Sustainability",
      description: "We are committed to environmentally responsible and sustainable practices."
    }
  ]

  return (
    <section className="bg-brand-ivory pb-20 lg:pb-28">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center md:text-left mb-16 border-t border-brand-charcoal/10 pt-16">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm mb-4 block">
            OUR VALUES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-navy font-bold leading-tight">
            What We Stand For
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-0 lg:divide-x divide-brand-charcoal/10">
          {values.map((value, idx) => (
            <div key={idx} className="flex flex-col items-center text-center lg:px-6">
              <div className="w-20 h-20 rounded-full bg-brand-navy flex items-center justify-center mb-6 shadow-md">
                {value.icon}
              </div>
              <h3 className="font-serif font-bold text-brand-navy text-xl mb-4">
                {value.title}
              </h3>
              <p className="text-sm text-brand-charcoal/70 leading-relaxed max-w-[240px]">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
