"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function CTAStrip() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(".cta-content", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-brand-navy pb-16 lg:pb-24 pt-4 border-t border-brand-navy overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-brand-navy border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative overflow-hidden rounded-2xl md:rounded-none px-6 md:px-0">
          
          <div className="text-center md:text-left z-10">
            <h2 className="cta-content font-serif text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-3">
              Let&apos;s Build a Stronger Future Together
            </h2>
            <p className="cta-content text-brand-ivory/70 text-sm md:text-base max-w-xl">
              Connect with us today for premium quality products and reliable export services.
            </p>
          </div>
          
          <div className="cta-content z-10">
            <Link href="/contact" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl shrink-0 group block">
              <Button variant="primary" className="h-14 px-8 text-base font-semibold whitespace-nowrap overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  GET IN TOUCH <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </span>
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  )
}
