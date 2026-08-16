import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-navy disabled:pointer-events-none disabled:opacity-50"
    const variants = {
      primary: "bg-brand-navy text-white hover:bg-brand-navy/90 hover:shadow-brand-navy/20",
      secondary: "bg-brand-gold text-brand-navy hover:bg-brand-gold/90 hover:shadow-brand-gold/20",
      outline: "border border-brand-navy bg-transparent text-brand-navy hover:bg-brand-navy hover:text-white hover:shadow-brand-navy/20",
      text: "text-brand-navy underline-offset-4 hover:underline hover:-translate-y-0 hover:shadow-none"
    }
    return (
      <button
        className={cn(baseStyles, variants[variant], "h-10 px-6 py-2", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

