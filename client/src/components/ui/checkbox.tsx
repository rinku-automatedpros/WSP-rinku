"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
  variant?: "default" | "custom"
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, checked, onCheckedChange, className, disabled, variant = "default", ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className={cn(
            "h-5 w-5 cursor-pointer border appearance-none",
            variant === "default" && [
              "rounded-sm border-black-10",
              "checked:bg-black-100 checked:border-black-100",
              "focus:outline-none focus:ring-2 focus:ring-black-10",
            ],
            variant === "custom" && [
              "rounded-md bg-black-10 border-[#E6E6E6]",
              "checked:bg-[#00A82D] checked:border-[#00A82D]",
              "focus:outline-none focus:ring-2 focus:ring-[#00A82D]/20",
            ],
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          disabled={disabled}
          {...props}
        />
        {variant === "custom" && checked && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 3L4.5 8.5L2 6" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        {variant === "default" && checked && (
          <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 flex items-center justify-center">
            <svg
              className="h-3 w-3 stroke-white-100"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox" 