import React from "react"
import { ElegantSelect } from "@/components/ui/ElegantSelect"

export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode
  options: { label: string; value: string }[]
}

export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ className, icon, options, name, onChange, value, defaultValue, placeholder }, ref) => {
    return (
      <ElegantSelect
        ref={ref}
        options={options}
        name={name}
        onChange={(val: string) => {
          if (onChange) {
            onChange({ target: { name, value: val } } as any)
          }
        }}
        value={value as string}
        defaultValue={defaultValue as string}
        placeholder={placeholder}
        icon={icon}
        className={className}
      />
    )
  }
)
SelectInput.displayName = "SelectInput"
SelectInput.displayName = "SelectInput"
