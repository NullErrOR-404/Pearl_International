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
            <span className="hero-element font-sans font-bold uppercase tracking-widest text-brand-gold text-sm mb-4 block">
              PREMIUM QUALITY.
            </span>
            <h1 
              className="hero-element tracking-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-brand-navy font-semibold leading-tight mb-6"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
            >
              Global Trust.
            </h1>
            
            {/* Gold Rule */}
            <div className="hero-element w-16 h-1 bg-brand-gold mb-6"></div>
            
            <p className="hero-element text-brand-charcoal/80 text-lg md:text-xl max-w-md leading-relaxed mb-10">
              Pearl International is a trusted exporter of high-quality agricultural products sourced from the best farms and delivered worldwide.
            </p>

            {/* CTAs */}
            <div className="hero-element flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
              <Link href="/products" className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl">
                <Button variant="primary" className="w-full h-14 px-8 text-base font-semibold group overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-2">EXPLORE PRODUCTS <span className="group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl">
                <Button variant="outline" className="w-full h-14 px-8 text-base font-semibold flex items-center justify-center gap-2 hover:bg-brand-gold/10 transition-colors border-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  CONTACT US
                </Button>
              </Link>
            </div>

            {/* Metrics */}
            <div className="hero-element grid grid-cols-3 gap-4 md:gap-8 w-full border-t border-brand-navy/10 pt-8">
              <div className="hero-metric flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <span className="font-serif text-3xl lg:text-4xl text-brand-navy font-bold">25+</span>
                </div>
                <span className="text-xs font-semibold tracking-wider text-brand-charcoal/70 uppercase">COUNTRIES<br/>SERVED</span>
              </div>
              <div className="hero-metric flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold shrink-0"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg>
                  <span className="font-serif text-3xl lg:text-4xl text-brand-navy font-bold">100+</span>
                </div>
                <span className="text-xs font-semibold tracking-wider text-brand-charcoal/70 uppercase">PREMIUM<br/>PRODUCTS</span>
              </div>
              <div className="hero-metric flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold shrink-0"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17V7"></path></svg>
                  <span className="font-serif text-3xl lg:text-4xl text-brand-navy font-bold">100%</span>
                </div>
                <span className="text-xs font-semibold tracking-wider text-brand-charcoal/70 uppercase">QUALITY<br/>ASSURED</span>
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
