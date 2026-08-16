"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Handle client-side mounting for Portal
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-brand-navy/10" role="banner">
        <div className="w-full mx-auto max-w-[1600px] px-4 md:px-12 lg:px-16 h-24 flex items-center justify-between gap-8 relative z-50">
          <Link 
            href="/" 
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm p-1 -ml-2"
            aria-label="Pearl International Home"
          >
            <Image 
              src="/mark.png" 
              alt="Pearl International" 
              width={90} 
              height={90} 
              className="h-12 md:h-16 w-auto object-contain" 
              priority
            />
          </Link>
          <nav className="hidden md:flex flex-1 justify-around items-center max-w-4xl" aria-label="Main Navigation">
            <Link href="/" className="relative text-sm font-medium text-brand-charcoal hover:-translate-y-0.5 hover:text-brand-gold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Home</Link>
            <Link href="/about" className="relative text-sm font-medium text-brand-charcoal hover:-translate-y-0.5 hover:text-brand-gold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">About</Link>
            <Link href="/products" className="relative text-sm font-medium text-brand-charcoal hover:-translate-y-0.5 hover:text-brand-gold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Products</Link>
            <Link href="/quality" className="relative text-sm font-medium text-brand-charcoal hover:-translate-y-0.5 hover:text-brand-gold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Quality</Link>
            <Link href="/services" className="relative text-sm font-medium text-brand-charcoal hover:-translate-y-0.5 hover:text-brand-gold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Services</Link>
            <Link href="/contact" className="relative text-sm font-medium text-brand-charcoal hover:-translate-y-0.5 hover:text-brand-gold transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm px-2 py-1">Contact</Link>
          </nav>
          <div className="hidden md:flex shrink-0 ml-4">
            <Link href="/contact" className="bg-brand-navy text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-brand-gold hover:text-brand-navy hover:-translate-y-0.5 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2">Enquire Now</Link>
          </div>
          <button 
            className="md:hidden p-2 text-brand-navy hover:text-brand-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm z-[110] relative"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-in spin-in-90 duration-300">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-in spin-in-90 duration-300">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Render Mobile Menu in a Portal to avoid CSS stacking context issues from the header's backdrop-blur */}
      {isMounted && createPortal(
        <div className="md:hidden">
          {/* Backdrop for Side Drawer */}
          <div 
            className={`fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Side Drawer Mobile Menu */}
          <div 
            className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white z-[105] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex flex-col h-full pt-32 pb-8 px-8 overflow-y-auto">
              <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Products', href: '/products' },
                  { name: 'Quality', href: '/quality' },
                  { name: 'Services', href: '/services' },
                  { name: 'Contact', href: '/contact' },
                ].map((link, idx) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`text-brand-navy font-sans text-2xl font-bold tracking-tight transition-all duration-300 hover:text-brand-gold ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${idx * 75 + 100}ms` : '0ms' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div 
                className={`mt-10 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: isMobileMenuOpen ? '550ms' : '0ms' }}
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-colors font-sans font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-sm inline-flex items-center justify-center w-full">
                  Enquire Bulk
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
