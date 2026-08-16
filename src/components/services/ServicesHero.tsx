import Image from "next/image"

export function ServicesHero() {
  return (
    <section className="relative min-h-[500px] xl:min-h-[550px] w-full bg-brand-navy overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Content Area */}
      <div className="w-full md:w-[50%] flex flex-col justify-center px-4 md:px-12 lg:px-24 py-16 md:py-24 relative z-20 h-full min-h-[500px]">
        
        {/* Breadcrumb */}
        <nav className="font-sans text-xs tracking-wider text-brand-gold/80 mb-6 uppercase flex items-center gap-2">
          <span className="font-bold text-brand-gold">OUR SERVICES</span>
        </nav>

        {/* Hero Title */}
        <h1 
          className="tracking-tight text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.1] mb-6"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
        >
          End-to-End Solutions.<br/>Global Standards.
        </h1>
        
        {/* Decorative Line */}
        <div className="w-16 h-1 bg-brand-gold mb-6"></div>
        
        {/* Description */}
        <p className="text-brand-ivory/80 text-base md:text-lg max-w-md leading-relaxed mb-10">
          We provide comprehensive services to ensure premium quality products reach you safely, on time, every time.
        </p>

      </div>

      {/* Right Image Composition */}
      <div className="relative w-full md:w-[50%] h-[400px] md:h-auto min-h-[400px]">
         {/* Organic curved wrapper matching the reference */}
         <div className="absolute inset-0 w-full h-full md:-ml-[15%] md:w-[115%] md:rounded-bl-[150px] overflow-hidden z-10 shadow-2xl">
            <Image 
              src="/images/services-hero-new.jpg" 
              alt="Global logistics and shipping" 
              fill 
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-brand-navy/60 via-brand-navy/20 to-transparent mix-blend-multiply"></div>
         </div>
         {/* Gold decorative curve mimicking the boundary line */}
         <div className="hidden md:block absolute bottom-0 -ml-[15%] w-[115%] h-[100%] border-b-[4px] border-l-[4px] border-brand-gold rounded-bl-[150px] pointer-events-none translate-x-2 -translate-y-2 opacity-60 z-0"></div>
      </div>

    </section>
  )
}
