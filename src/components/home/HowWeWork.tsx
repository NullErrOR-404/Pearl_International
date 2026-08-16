"use client"

import { Leaf, Search, Package, Truck } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useGSAP(() => {
    // Header text stagger
    gsap.from(".how-header", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out"
    })

    // Line drawing animation
    gsap.fromTo(".progress-line", 
      { width: "0%" },
      {
        width: "100%",
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        ease: "none"
      }
    )

    // Steps pop-in
    gsap.from(".process-step", {
      scrollTrigger: {
        trigger: ".process-steps",
        start: "top 75%",
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.5)"
    })
    // Continuous Icon Animations
    
    // Leaf rustling
    gsap.to(".icon-leaf", {
      rotation: 15,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1.5,
      transformOrigin: "bottom center"
    })

    // Search scanning/inspecting
    gsap.to(".icon-search", {
      x: 5,
      y: -5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1.2
    })

    // Package floating/bouncing
    gsap.to(".icon-package", {
      y: -6,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.8
    })

    // Truck moving forward on bumpy road
    gsap.to(".icon-truck", {
      x: 8,
      y: -2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      duration: 1
    })

  }, { scope: sectionRef })

  const steps = [
    {
      icon: <Leaf className="w-8 h-8 text-white icon-leaf group-hover:rotate-12 group-hover:text-green-400 transition-all duration-300" />,
      title: "SOURCING",
      description: "We source the best\nquality produce."
    },
    {
      icon: <Search className="w-8 h-8 text-white icon-search group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300" />,
      title: "QUALITY CHECK",
      description: "Rigorous quality\ninspection."
    },
    {
      icon: <Package className="w-8 h-8 text-white icon-package group-hover:-translate-y-2 group-hover:text-orange-400 transition-all duration-300" />,
      title: "PACKAGING",
      description: "Hygienic & export\nstandard packaging."
    },
    {
      icon: <Truck className="w-8 h-8 text-white icon-truck group-hover:translate-x-2 group-hover:text-gray-300 transition-all duration-300" />,
      title: "SHIPPING",
      description: "Timely delivery to\nglobal destinations."
    }
  ]

  return (
    <section ref={sectionRef} className="bg-brand-navy py-20 lg:py-28 relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20 mix-blend-luminosity">
        <Image 
          src="/images/services-hero.jpg" 
          alt="Agricultural Farming" 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-brand-navy/60"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="how-header font-sans font-bold uppercase tracking-widest text-brand-gold text-sm block mb-4">
            HOW WE WORK
          </span>
          <h2 className="how-header font-serif text-4xl md:text-5xl text-white font-bold">
            From Farm to Global Markets
          </h2>
        </div>

        {/* Process Steps */}
        <div className="process-steps relative">
          {/* Decorative Dashed Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-white/20 z-0">
            {/* Progress Solid Line */}
            <div className="progress-line absolute top-[-2px] left-0 h-[2px] bg-brand-gold z-10 w-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step group flex flex-col items-center cursor-pointer">
                <div className="w-20 h-20 rounded-full border border-brand-gold bg-brand-navy flex items-center justify-center mb-6 shadow-lg shadow-brand-gold/10 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="font-sans font-bold text-white text-sm tracking-wider uppercase mb-3 transition-colors duration-300 group-hover:text-brand-gold">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-ivory/70 whitespace-pre-line leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
