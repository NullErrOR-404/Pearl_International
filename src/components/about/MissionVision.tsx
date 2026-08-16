import { Target, Eye } from "lucide-react"

export function MissionVision() {
  return (
    <section className="bg-brand-navy py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm block mb-4">
            OUR MISSION & VISION
          </span>
        </div>

        {/* Content Blocks */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 md:gap-0 relative">
          
          {/* Vertical Divider (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-gold/30 -translate-x-1/2"></div>
          {/* Horizontal Divider (Mobile) */}
          <div className="md:hidden w-full h-px bg-brand-gold/30 my-2"></div>

          {/* Left: Mission */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pr-16 lg:pr-24">
            <Target className="w-12 h-12 text-brand-gold mb-6" strokeWidth={1.5} />
            <h3 className="font-serif text-3xl text-white font-bold mb-4">Our Mission</h3>
            <p className="text-brand-ivory/80 leading-relaxed text-lg max-w-md">
              To provide premium quality agricultural products to the world with integrity, innovation and exceptional service.
            </p>
          </div>

          {/* Right: Vision */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pl-16 lg:pl-24 pt-12 md:pt-0">
            <Eye className="w-12 h-12 text-brand-gold mb-6" strokeWidth={1.5} />
            <h3 className="font-serif text-3xl text-white font-bold mb-4">Our Vision</h3>
            <p className="text-brand-ivory/80 leading-relaxed text-lg max-w-md">
              To be a globally recognized export company known for quality, trust and long-term partnerships.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
