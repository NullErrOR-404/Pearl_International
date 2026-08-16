import React from "react"

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-white border border-brand-charcoal/10 rounded-sm py-3 px-4 ${
            icon ? "pl-10" : ""
          } text-sm text-brand-navy placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${className || ""}`}
          {...props}
        />
      </div>
    )
  }
)
TextInput.displayName = "TextInput"
