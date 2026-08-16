"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { Globe, ShieldCheck, Leaf, Handshake } from "lucide-react"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    // Left text animation
    gsap.from(".why-text", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      x: -40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out"
    })

    // Right features stagger animation
    gsap.from(".why-feature", {
      scrollTrigger: {
        trigger: ".why-features-grid",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    })

    // Background Decorative Parallax
    gsap.to(".why-bg-shape", {
      y: "100px",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  }, { scope: sectionRef })

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-brand-gold" />,
      title: "GLOBAL\nFOOTPRINT",
      description: "Trusted exporter serving customers across the world."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-gold" />,
      title: "PREMIUM\nQUALITY",
      description: "Strict quality checks to ensure the best in every shipment."
    },
    {
      icon: <Leaf className="w-8 h-8 text-brand-gold" />,
      title: "NATURALLY\nSOURCED",
      description: "Carefully sourced from the best farms and plantations."
    },
    {
      icon: <Handshake className="w-8 h-8 text-brand-gold" />,
      title: "TRUSTED\nPARTNER",
      description: "Building long-term relationships based on trust and reliability."
    }
  ]

  return (
    <section ref={sectionRef} className="bg-brand-ivory py-20 lg:py-28 overflow-hidden relative z-0">
      
      {/* Decorative Parallax Background Shape */}
      <div className="why-bg-shape absolute top-0 left-[-10%] w-[40%] h-[150%] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Image */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="why-text flex items-center gap-4 mb-4">
                <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm">
                  WHY CHOOSE US
                </span>
                <div className="w-12 h-[1px] bg-brand-gold hidden sm:block"></div>
              </div>
              <h2 className="why-text font-serif text-4xl md:text-5xl text-brand-navy font-bold leading-tight mb-6">
                Your Trusted Export Partner Worldwide
              </h2>
              <p className="why-text text-brand-charcoal/80 text-lg leading-relaxed mb-8">
                We are committed to delivering premium quality products with reliability, transparency and excellence at every step.
              </p>
              <div className="why-text mb-8">
                <Link href="/about" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl inline-block group">
                  <Button variant="primary" className="h-14 px-8 text-base font-semibold transition-all">
                    <span className="flex items-center gap-2">ABOUT US <span className="group-hover:translate-x-1 transition-transform">&rarr;</span></span>
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Added Image Block */}
            <div className="why-text relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/services-feed.jpg" 
                alt="Global Export Operations" 
                fill 
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Features */}
          <div className="why-features-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-brand-charcoal/10 border-y sm:border-y-0 border-brand-charcoal/10 py-8 lg:py-0">
            {features.map((feature, idx) => (
              <div key={idx} className="why-feature flex flex-col items-center text-center lg:px-6">
                <div className="w-20 h-20 rounded-full border border-brand-gold bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform animate-float">
                  {feature.icon}
                </div>
                <h3 className="font-sans font-bold text-brand-navy text-sm tracking-wider uppercase whitespace-pre-line leading-tight mb-4 min-h-[2.5rem] flex items-center justify-center">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-charcoal/70 leading-relaxed max-w-[200px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
