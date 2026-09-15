"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } })
    
    // Image parallax entry
    tl.from(".hero-image", {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    })
    
    // Stagger text and elements
    .from(".hero-element", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    }, "-=1.0")
    
    // Metrics stagger
    .from(".hero-metric", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    }, "-=0.4")
    
    // Scroll Parallax for image interior
    gsap.to(".hero-image-inner", {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
    
    // Scroll Parallax for background graphic
    gsap.to(".hero-bg-graphic", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-[600px] xl:min-h-[700px] w-full bg-brand-ivory overflow-hidden">
      
      {/* Background Decorative Graphic */}
      <div className="hero-bg-graphic absolute right-0 top-0 bottom-0 w-[45%] bg-brand-gold/5 rounded-l-[100px] lg:rounded-l-[200px] pointer-events-none hidden md:block"></div>

      <div className="container mx-auto px-4 max-w-7xl h-full">
        <div className="flex flex-col md:flex-row items-center h-full py-16 md:py-24 gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start z-10 w-full max-w-xl">
            <span className="hero-element font-sans font-bold uppercase tracking-widest text-brand-gold text-xs sm:text-sm mb-3 block">
              DIRECT EXPORT SOURCING FROM INDIA
            </span>
            <h1 
              className="hero-element tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-navy font-bold leading-tight mb-4"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            >
              Bulk Agricultural Commodities Packed for Global Sea Freight.
            </h1>
            
            {/* Gold Rule */}
            <div className="hero-element w-16 h-1 bg-brand-gold mb-5"></div>
            
            <p className="hero-element text-brand-charcoal/85 text-base sm:text-lg max-w-lg leading-relaxed mb-6">
              We source, inspect, and export container-load coconuts, whole spices, and fresh produce directly from regional farm belts to international ports.
            </p>

            {/* Pre-CTA Objection Handling Badge */}
            <div className="hero-element inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-brand-navy/5 border border-brand-navy/15 text-brand-navy text-xs font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              <span>MOQ: 1x20ft FCL &bull; APEDA &amp; Phytosanitary Certified &bull; SGS Inspection Ready</span>
            </div>

            {/* CTAs with Verb + Outcome */}
            <div className="hero-element flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <Link href="/contact" className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl">
                <Button variant="primary" className="w-full h-14 px-8 text-base font-semibold group overflow-hidden relative shadow-md">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    REQUEST CONTAINER QUOTE <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>
                </Button>
              </Link>
              <Link href="/products" className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl">
                <Button variant="outline" className="w-full h-14 px-7 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 hover:bg-brand-gold/10 transition-colors border-2">
                  EXPLORE COMMODITY SPECS
                </Button>
              </Link>
            </div>

            {/* Concrete Commercial Metrics */}
            <div className="hero-element grid grid-cols-3 gap-4 md:gap-6 w-full border-t border-brand-navy/10 pt-6">
              <div className="hero-metric flex flex-col gap-1">
                <span className="font-serif text-2xl lg:text-3xl text-brand-navy font-bold">FCL &amp; LCL</span>
                <span className="text-xs font-semibold tracking-wider text-brand-charcoal/70 uppercase">SEA CONTAINER<br/>STOWAGE</span>
              </div>
              <div className="hero-metric flex flex-col gap-1">
                <span className="font-serif text-2xl lg:text-3xl text-brand-navy font-bold">CUSTOM</span>
                <span className="text-xs font-semibold tracking-wider text-brand-charcoal/70 uppercase">JUTE, PP &amp;<br/>VACUUM PACKS</span>
              </div>
              <div className="hero-metric flex flex-col gap-1">
                <span className="font-serif text-2xl lg:text-3xl text-brand-navy font-bold">PORT-READY</span>
                <span className="text-xs font-semibold tracking-wider text-brand-charcoal/70 uppercase">CHENNAI &amp;<br/>TUTICORIN</span>
              </div>
            </div>
          </div>
          
          {/* Right Image Composition */}
          <div className="flex-1 w-full relative h-[400px] md:h-full min-h-[500px]">
            <div className="hero-image absolute inset-0 w-full h-full md:rounded-l-[120px] lg:rounded-l-[200px] overflow-hidden shadow-2xl z-20 bg-brand-navy/5">
              <Image 
                src="/images/home/hero.jpg" 
                alt="Pearl International Global Export" 
                fill 
                className="hero-image-inner object-cover scale-[1.1]"
                priority
                quality={100}
                unoptimized
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-ivory/20 to-transparent mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
