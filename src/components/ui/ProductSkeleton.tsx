export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-brand-navy/10 bg-white shadow-sm flex flex-col animate-pulse">
          <div className="h-64 bg-brand-navy/5 w-full"></div>
          <div className="p-6 flex flex-col flex-1 space-y-4">
            <div className="h-6 bg-brand-navy/10 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-brand-navy/5 rounded"></div>
              <div className="h-4 bg-brand-navy/5 rounded w-5/6"></div>
            </div>
            <div className="mt-auto pt-6 space-y-3">
              <div className="h-10 bg-brand-navy/10 rounded-lg w-full"></div>
              <div className="h-10 bg-brand-navy/10 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
