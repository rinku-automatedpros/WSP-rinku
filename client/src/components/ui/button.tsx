"use client"

import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "signin"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, variant = "default", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center 
          ${variant === "signin" ? `
            w-full py-3 px-4 rounded-[30px]
            ${disabled 
              ? 'bg-black/5 text-black/40 cursor-not-allowed' 
              : 'bg-black text-white hover:opacity-90'
            }
          ` : ''}
          ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button } 