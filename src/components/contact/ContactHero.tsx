import Image from "next/image"
import { ShieldCheck, Globe, Headset } from "lucide-react"

export function ContactHero() {
  return (
    <section className="relative min-h-[500px] xl:min-h-[550px] w-full bg-brand-navy overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Content Area */}
      <div className="w-full md:w-[50%] flex flex-col justify-center px-4 md:px-12 lg:px-24 py-16 md:py-24 relative z-20 h-full min-h-[500px]">
        
        {/* Breadcrumb */}
        <nav className="font-sans text-xs tracking-wider text-brand-gold/80 mb-6 uppercase flex items-center gap-2">
          <span>Home</span>
          <span className="text-brand-ivory/50">«»</span>
          <span className="text-brand-ivory">Get In Touch</span>
        </nav>

        {/* Hero Title */}
        <h1 
          className="tracking-tight text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-[1.1] mb-6"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
        >
          Get In Touch
        </h1>
        
        {/* Decorative Line */}
        <div className="w-16 h-1 bg-brand-gold mb-6"></div>
        
        {/* Description */}
        <p className="text-brand-ivory/80 text-base md:text-lg max-w-md leading-relaxed mb-10">
          We are here to answer your questions, listen to your requirements and help you grow your business with premium quality products.
        </p>

        {/* Support Features */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <span className="block text-brand-ivory font-bold text-xs uppercase tracking-wider mb-1">Quick Response</span>
              <span className="text-brand-ivory/60 text-xs">We reply within<br/>24 hours</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <span className="block text-brand-ivory font-bold text-xs uppercase tracking-wider mb-1">Global Support</span>
              <span className="text-brand-ivory/60 text-xs">We serve clients<br/>worldwide</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Headset className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <span className="block text-brand-ivory font-bold text-xs uppercase tracking-wider mb-1">Dedicated Team</span>
              <span className="text-brand-ivory/60 text-xs">Our team is here<br/>to assist you</span>
            </div>
          </div>

        </div>

      </div>

      {/* Right Image Composition */}
      <div className="relative w-full md:w-[50%] h-[400px] md:h-auto min-h-[400px]">
         {/* Organic curved wrapper matching the reference */}
         <div className="absolute inset-0 w-full h-full md:-ml-[15%] md:w-[115%] md:rounded-bl-[150px] overflow-hidden z-10 shadow-2xl">
            <Image 
              src="/images/contact-hero-new.jpg" 
              alt="Global logistics connection" 
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
