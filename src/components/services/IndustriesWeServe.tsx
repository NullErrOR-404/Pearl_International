import Image from "next/image"

export function IndustriesWeServe() {
  const industries = [
    {
      title: "Food & Beverages",
      desc: "Supplying quality ingredients for the food and beverage industry.",
      image: "/images/services-food-new.jpg"
    },
    {
      title: "Pharmaceuticals",
      desc: "Providing natural, pure and reliable ingredients for pharma applications.",
      image: "/images/services-pharma-new.jpg"
    },
    {
      title: "Cosmetics",
      desc: "High-quality natural ingredients for beauty and personal care products.",
      image: "/images/services-cosmetics-new.jpg"
    },
    {
      title: "Animal Feed",
      desc: "Nutritious and safe products for animal health and productivity.",
      image: "/images/services-feed-new.jpg"
    },
    {
      title: "Retail & Wholesale",
      desc: "Bulk supply solutions for retailers, wholesalers and distributors.",
      image: "/images/services-retail-new.jpg"
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[1440px]">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-xs block mb-3 flex items-center justify-center gap-2">
            INDUSTRIES WE SERVE
            <div className="w-8 h-px bg-brand-gold"></div>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-navy">
            Serving Diverse Industries
          </h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {industries.map((ind, i) => (
            <div key={i} className="flex flex-col group">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-t-xl overflow-hidden mb-0">
                <Image 
                  src={ind.image} 
                  alt={ind.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              
              {/* Content Box */}
              <div className="bg-white border border-t-0 border-brand-charcoal/10 rounded-b-xl p-5 flex-1 flex flex-col">
                <h3 className="font-serif font-bold text-lg text-brand-navy mb-2">
                  {ind.title}
                </h3>
                <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
