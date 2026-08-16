import React from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const defaultId = id || React.useId()
    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center mt-0.5">
          <input
            type="checkbox"
            id={defaultId}
            ref={ref}
            className={`peer appearance-none w-4 h-4 border border-brand-charcoal/20 rounded-sm bg-white checked:bg-brand-navy checked:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-1 transition-all cursor-pointer ${className || ""}`}
            {...props}
          />
          {/* Check icon */}
          <svg
            className="absolute w-3 h-3 text-white pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <label htmlFor={defaultId} className="text-sm text-brand-charcoal/70 leading-tight cursor-pointer select-none">
          {label}
        </label>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"
