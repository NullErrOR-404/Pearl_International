"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Snappy but smooth (higher = snappier, lower = more dreamy)
      wheelMultiplier: 1.2, // Slightly faster wheel scrolling for responsiveness
      smoothWheel: true,
      syncTouch: true, // Sync touch scrolling for mobile buttery feel
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}
