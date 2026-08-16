import { ProductPageHero } from "@/components/products/ProductPageHero"

export default function Loading() {
  return (
    <div className="flex flex-col w-full bg-[#FAFAFA]">
      
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-brand-navy overflow-hidden flex items-center">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
        <div className="container mx-auto px-4 max-w-7xl z-10 space-y-4">
          <div className="h-6 bg-white/20 w-32 rounded"></div>
          <div className="h-12 md:h-16 bg-white/20 w-3/4 md:w-1/2 rounded"></div>
          <div className="h-4 bg-white/20 w-2/3 md:w-1/3 rounded mt-6"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-7xl py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar Skeleton */}
          <aside className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-28">
            <div className="h-6 bg-brand-charcoal/10 w-1/2 rounded mb-6"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-brand-charcoal/5 rounded-lg w-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
              </div>
            ))}
            
            <div className="mt-12 h-64 bg-brand-charcoal/5 rounded-2xl w-full relative overflow-hidden">
               <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </aside>

          {/* Right Product Area Skeleton */}
          <main className="flex-1 w-full min-w-0">
            <div className="flex justify-between items-center mb-8 border-b border-brand-charcoal/10 pb-4">
               <div className="h-8 bg-brand-charcoal/10 w-48 rounded relative overflow-hidden">
                 <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
               </div>
               <div className="h-4 bg-brand-charcoal/5 w-24 rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex flex-col bg-white rounded-xl overflow-hidden border border-brand-charcoal/10 h-full shadow-sm">
                  <div className="relative h-48 sm:h-56 w-full bg-brand-navy/5 overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="h-6 bg-brand-charcoal/10 w-3/4 rounded"></div>
                    <div className="h-4 bg-brand-charcoal/5 w-full rounded"></div>
                    <div className="h-4 bg-brand-charcoal/5 w-2/3 rounded"></div>
                    
                    <div className="mt-4 h-10 border border-brand-charcoal/10 rounded-sm w-full relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  )
}
