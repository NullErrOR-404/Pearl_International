import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative min-h-[500px] xl:min-h-[600px] w-full bg-brand-navy overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-7xl h-full relative z-10">
        <div className="flex flex-col md:flex-row items-center h-full py-16 md:py-24 gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start w-full max-w-xl">
            <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm mb-4 block">
              ABOUT US
            </span>
            <h1 
              className="tracking-tight text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-6"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
            >
              Who We Are
            </h1>
            
            {/* Gold Rule */}
            <div className="w-16 h-1 bg-brand-gold mb-6"></div>
            
            <p className="text-brand-ivory/80 text-lg md:text-xl max-w-md leading-relaxed">
              Pearl International is a trusted exporter of high-quality agricultural products, connecting the goodness of nature to the world.
            </p>
          </div>

          {/* Spacer for right image */}
          <div className="flex-1 hidden md:block"></div>

        </div>
      </div>

      {/* Right Image Composition - Curved */}
      <div className="relative md:absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-[400px] md:h-full overflow-hidden">
         {/* The curve is implemented as a mask or a bordered div. We use a div with border radius matching the reference. */}
         <div className="absolute inset-0 w-full h-full md:-ml-[15%] md:w-[115%] md:rounded-bl-[150px] overflow-hidden z-10 shadow-2xl">
            <Image 
              src="/images/services-retail.jpg" 
              alt="About Pearl International" 
              fill 
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent md:bg-gradient-to-l"></div>
         </div>
         {/* Gold decorative accent line following the curve */}
         <div className="hidden md:block absolute bottom-0 left-0 w-full h-full border-b-[6px] border-l-[6px] border-brand-gold rounded-bl-[200px] pointer-events-none translate-x-4 -translate-y-4 opacity-50"></div>
      </div>

    </section>
  )
}
