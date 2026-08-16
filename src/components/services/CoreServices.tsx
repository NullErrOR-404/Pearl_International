import Link from "next/link"
import { Leaf, ShieldCheck, Factory, Package, Truck, Headset } from "lucide-react"

export function CoreServices() {
  const services = [
    {
      num: "01",
      title: "Product Sourcing",
      desc: "We source the finest agricultural products from trusted farms and reliable growers.",
      icon: <Leaf className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      num: "02",
      title: "Quality Assurance",
      desc: "Strict quality checks at every stage to ensure products meet international standards.",
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      num: "03",
      title: "Processing & Grading",
      desc: "Advanced processing and grading to retain natural goodness and ensure uniform quality.",
      icon: <Factory className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      num: "04",
      title: "Packaging Solutions",
      desc: "Hygienic, durable and customized packaging to preserve freshness and ensure safety.",
      icon: <Package className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      num: "05",
      title: "Logistics & Shipping",
      desc: "Efficient logistics and global shipping solutions for timely and safe delivery worldwide.",
      icon: <Truck className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    },
    {
      num: "06",
      title: "Customer Support",
      desc: "Dedicated support team available to assist you before, during and after your order.",
      icon: <Headset className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center justify-center gap-2">
            WHAT WE OFFER
            <div className="w-8 h-px bg-brand-gold"></div>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Our Core Services
          </h2>
          <p className="text-brand-charcoal/70 max-w-2xl mx-auto">
            From sourcing to shipment, we handle everything with precision and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((srv, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-brand-charcoal/10 hover:border-brand-gold/30 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative pt-12">
              
              {/* Number Badge */}
              <div className="absolute top-0 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center font-serif font-bold border-2 border-white shadow-sm">
                {srv.num}
              </div>

              {/* Icon Container */}
              <div className="w-20 h-20 rounded-full bg-brand-ivory/30 flex items-center justify-center mb-6 border border-brand-gold/20 group-hover:scale-110 group-hover:bg-brand-ivory/50 transition-all duration-500">
                {srv.icon}
              </div>

              <h3 className="font-serif font-bold text-xl text-brand-navy mb-3">
                {srv.title}
              </h3>
              
              <p className="text-brand-charcoal/70 text-sm leading-relaxed mb-8 flex-1">
                {srv.desc}
              </p>

              <Link href="/contact" className="w-full inline-flex items-center justify-center py-3 border border-brand-charcoal/10 text-brand-navy/70 text-xs font-bold tracking-widest uppercase hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-colors rounded-sm group/btn">
                LEARN MORE <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
