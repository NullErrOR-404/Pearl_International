import React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3.5 text-brand-charcoal/40 pointer-events-none">
            {icon}
          </div>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-white border border-brand-charcoal/10 rounded-sm py-3 px-4 ${
            icon ? "pl-10" : ""
          } text-sm text-brand-navy placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors resize-y min-h-[120px] ${className || ""}`}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
