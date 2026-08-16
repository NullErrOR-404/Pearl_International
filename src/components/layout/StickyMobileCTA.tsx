"use client"

import Link from "next/link"
import { MessageSquare } from "lucide-react"

export function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none flex justify-center pb-6">
      <Link 
        href="/contact" 
        className="pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full max-w-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-xl"
      >
        <button className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl transition-colors">
          <MessageSquare className="w-5 h-5 text-brand-gold" />
          ENQUIRE NOW
        </button>
      </Link>
    </div>
  )
}
