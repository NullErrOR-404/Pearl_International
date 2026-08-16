'use client'

import { ElegantSelect } from "@/components/ui/ElegantSelect"

interface ProductToolbarProps {
  categoryName: string
  productCount: number
  currentSort: string
  onSortChange: (value: string) => void
}

export function ProductToolbar({ categoryName, productCount, currentSort, onSortChange }: ProductToolbarProps) {
  const handleSortChange = (value: string) => {
    onSortChange(value)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      
      {/* Left side: Category Header */}
      <div>
        <h2 className="font-sans font-bold uppercase tracking-widest text-brand-navy text-lg mb-2 flex items-center gap-3">
          {categoryName}
          <div className="w-8 h-px bg-brand-gold hidden sm:block"></div>
        </h2>
      </div>

      {/* Right side: Count & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <span className="text-sm text-brand-charcoal/60">
          Showing 1–{productCount} of {productCount} products
        </span>
        
        {/* Sort Dropdown */}
        <div className="relative inline-block w-full sm:w-48 z-20">
          <ElegantSelect 
            className="!py-2 !rounded-md"
            value={currentSort}
            onChange={handleSortChange}
            options={[
              { label: "Sort by: Popular", value: "popular" },
              { label: "Name A–Z", value: "asc" },
              { label: "Name Z–A", value: "desc" },
              { label: "Newest", value: "newest" },
            ]}
          />
        </div>
      </div>
      
    </div>
  )
}
