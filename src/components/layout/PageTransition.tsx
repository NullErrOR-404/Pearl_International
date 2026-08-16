"use client"

import { ReactNode, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export function PageTransition({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // A fast, smooth fade-up that makes navigation feel instant and polished
    gsap.from(container.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "all"
    })
  }, { scope: container })

  return (
    <div ref={container}>
      {children}
    </div>
  )
}
