export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-brand-ivory flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        
        {/* Animated Rings */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-brand-navy/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-gold rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 border-4 border-brand-navy rounded-full border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
          
          {/* Center Pearl */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-brand-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(207,181,59,0.6)]"></div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="font-serif font-bold text-2xl text-brand-navy tracking-wide mb-1">Pearl International</h2>
          <p className="font-sans text-brand-charcoal/60 uppercase tracking-[0.2em] text-xs font-bold">Loading Experience</p>
        </div>

      </div>
    </div>
  )
}
