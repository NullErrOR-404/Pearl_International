"use client"

import { ProductCategoryCard } from "./ProductCategoryCard"
import { Category } from "@/lib/data/categories"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ProductRangeProps {
  categories: Category[]
}

export function ProductRange({ categories }: ProductRangeProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header elements fade in
    gsap.from(".header-element", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    })

    // Cards stagger up
    gsap.from(".product-card-wrapper", {
      scrollTrigger: {
        trigger: ".product-grid",
        start: "top 85%",
      },
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-brand-navy py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="flex-1 text-center md:text-left">
            <div className="header-element flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="font-sans font-bold uppercase tracking-widest text-brand-gold text-sm">
                OUR PRODUCT RANGE
              </span>
              <div className="w-12 h-[1px] bg-brand-gold hidden sm:block"></div>
            </div>
            <h2 className="header-element font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold">
              Quality Products. <br className="hidden sm:block"/>Naturally Sourced.
            </h2>
          </div>
          
          {/* Carousel Controls (Presentational) */}
          <div className="header-element flex gap-3 justify-center md:justify-end">
            <button 
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Previous products"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-navy transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Next products"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="product-card-wrapper">
              <ProductCategoryCard 
                id={category.id}
                name={category.name}
                slug={category.slug}
                description={category.description}
                image={category.image}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
