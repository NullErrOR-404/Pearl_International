"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export function FAQ({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  
  return (
    <div className="space-y-4 w-full" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, i) => (
        <div key={i} className="border border-brand-navy/10 rounded-xl overflow-hidden bg-white shadow-sm">
          <button 
            className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors hover:bg-brand-navy/5"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span className="font-serif font-bold text-brand-navy text-lg pr-4">{item.question}</span>
            <ChevronDown 
              className={cn("w-5 h-5 text-brand-gold transition-transform duration-300 shrink-0 motion-reduce:transition-none", openIndex === i && "rotate-180")} 
              aria-hidden="true"
            />
          </button>
          <div 
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            className={cn("overflow-hidden transition-all duration-300 motion-reduce:transition-none", openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}
          >
            <p className="text-brand-charcoal/80 font-sans px-6 pb-5 pt-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
