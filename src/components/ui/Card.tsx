import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border border-brand-navy/10 bg-white text-brand-charcoal shadow-sm", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }

