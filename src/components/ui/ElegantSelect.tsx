"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

export interface ElegantSelectProps {
  options: { label: string; value: string }[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  icon?: React.ReactNode
  className?: string
  name?: string
}

export const ElegantSelect = React.forwardRef<HTMLInputElement, ElegantSelectProps>(
  ({ options, value, defaultValue, onChange, placeholder = "Select an option", icon, className = "", name }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState(value || defaultValue || "")
    const dropdownRef = useRef<HTMLDivElement>(null)

    const currentValue = value !== undefined ? value : internalValue
    const selectedOption = options.find((opt) => opt.value === currentValue)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (val: string) => {
      setInternalValue(val)
      if (onChange) {
        onChange(val)
      }
      setIsOpen(false)
    }

    return (
      <div className="relative w-full" ref={dropdownRef}>
        {/* Hidden input to support React Hook Form refs and native form submissions */}
        <input type="hidden" name={name} value={currentValue} ref={ref} />
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-white/40 backdrop-blur-md border border-brand-charcoal/10 rounded-2xl py-3 px-4 text-sm text-brand-navy focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
        >
          <div className="flex items-center gap-3 truncate">
            {icon && <span className="text-brand-charcoal/40">{icon}</span>}
            <span className={selectedOption ? "text-brand-navy" : "text-brand-charcoal/60"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-brand-charcoal/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-gold" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white/80 backdrop-blur-xl border border-brand-charcoal/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl text-sm transition-colors duration-200 ${
                    currentValue === opt.value
                      ? "bg-brand-gold/10 text-brand-navy font-bold"
                      : "text-brand-charcoal hover:bg-white/50"
                  }`}
                >
                  {opt.label}
                  {currentValue === opt.value && <Check className="w-4 h-4 text-brand-gold" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)
ElegantSelect.displayName = "ElegantSelect"
