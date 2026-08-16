import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function OurCommitment() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div>
            <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm mb-4 block">
              OUR COMMITMENT
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-navy font-bold leading-tight mb-6 max-w-md">
              Delivering Goodness, Building Trust
            </h2>
            
            <div className="w-12 h-1 bg-brand-gold mb-6"></div>
            
            <p className="text-brand-charcoal/80 text-base leading-relaxed mb-8 max-w-md">
              We are committed to delivering premium quality products with reliability, consistency and on-time delivery. Our team works closely with trusted farmers, follows strict quality standards and uses advanced processing and packaging techniques to ensure excellence in every shipment.
            </p>
            
            <Link 
              href="/quality" 
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-4 rounded-xl text-sm font-bold tracking-wider hover:bg-brand-gold hover:text-brand-navy transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              WHY CHOOSE US <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Bento Grid */}
          <div className="relative w-full h-[500px] lg:h-[600px]">
            {/* Main large image (spans 2 rows) */}
            <div className="absolute top-0 right-0 w-[60%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white translate-x-4 -translate-y-4">
              <Image 
                src="/images/services-hero.jpg" 
                alt="Global Export Operations" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Bottom Left Image - Slightly smaller, overlaps top right */}
            <div className="absolute bottom-0 left-0 w-[55%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white -translate-x-4 translate-y-4 z-10">
              <Image 
                src="/images/product-black-pepper.webp" 
                alt="Quality Spices" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            {/* Middle Right Image - Small accent image */}
            <div className="absolute top-1/2 -right-8 w-[40%] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white -translate-y-1/2 z-20">
              <Image 
                src="/images/product-coconut-new.webp" 
                alt="Fresh Coconuts" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
