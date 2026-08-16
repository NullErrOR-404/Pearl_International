import { ShieldCheck, Globe, Clock, Handshake } from "lucide-react"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Reliable Quality",
      desc: "We deliver consistent quality you can always trust.",
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Global Reach",
      desc: "Serving 25+ countries with a strong global network.",
      icon: <Globe className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "On-Time Delivery",
      desc: "Timely and efficient delivery, every time, anywhere.",
      icon: <Clock className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      title: "Long-Term Partnership",
      desc: "We believe in building relationships that grow together.",
      icon: <Handshake className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    }
  ]

  return (
    <section className="bg-brand-ivory/40 py-16 border-y border-brand-charcoal/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Title */}
          <div className="w-full lg:w-[35%]">
            <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center gap-2">
              WHY CHOOSE US
              <div className="w-8 h-px bg-brand-gold"></div>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Your Trusted Partner<br/>in Global Trade
            </h2>
            <p className="text-brand-charcoal/70 leading-relaxed">
              We combine quality, reliability and expertise to deliver the best experience to our clients.
            </p>
          </div>

          {/* Right Features Grid */}
          <div className="w-full lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-brand-navy flex items-center justify-center mb-6 animate-float shadow-md">
                  {r.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-navy mb-2">
                  {r.title}
                </h3>
                <p className="text-brand-charcoal/70 text-xs leading-relaxed max-w-[150px]">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
