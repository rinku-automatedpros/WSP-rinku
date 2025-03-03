"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  variant?: "default" | "signin" | "otp"
  error?: boolean
  hasValue?: boolean
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", placeholder, type = "text", value, onChange, variant = "default", error, hasValue, onKeyDown, onPaste, ...props }, ref) => {
    if (variant === "otp") {
      return (
        <input
          type={type}
          inputMode="numeric"
          className={cn(
            'w-[48px] h-[48px] text-center rounded-full transition-all duration-200',
            'bg-[var(--black-background-5)] border border-[var(--border-black-10)]',
            'focus:outline-none focus:ring-0',
            !hasValue && 'focus:border-black/20 focus:bg-white',
            'text-[var(--text-black-100)]',
            hasValue && 'bg-[var(--black-background-100)] text-[var(--text-white-100)] border-transparent focus:bg-[var(--black-background-100)] focus:text-[var(--text-white-100)] focus:border-transparent',
            error && [
              'bg-white text-[var(--text-semantic-red)]',
              'border-black/10',
              'focus:border-black/20 focus-visible:border-black/20',
              hasValue && 'bg-white text-[var(--text-semantic-red)] border-black/10'
            ],
            className
          )}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '');
            const lastChar = val.slice(-1);
            onChange({ ...e, target: { ...e.target, value: lastChar } });
          }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          maxLength={1}
          {...props}
        />
      )
    }

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            'block w-full h-[48px] rounded-[30px] px-4',
            variant === "signin" ? [
              'border border-[var(--border-black-10)] bg-[var(--white-background-60)]',
              'text-[var(--text-black-100)] placeholder:text-[var(--text-black-40)]',
              'focus:outline-none focus:border-black/20',
              'focus-visible:outline-none focus-visible:border-black/20'
            ] : [
              'appearance-none border border-[var(--border-black-10)] bg-[var(--white-background-60)]',
              'text-[var(--text-black-100)] placeholder:text-[var(--text-black-40)]',
              'focus:outline-none focus:border-black/20',
              'focus-visible:outline-none focus-visible:border-black/20'
            ],
            error && [
              'border-[var(--text-semantic-red)]',
              'text-[var(--text-semantic-red)] placeholder:text-[var(--text-semantic-red)]',
              'focus:border-[var(--text-semantic-red)]',
              'focus-visible:border-[var(--text-semantic-red)]'
            ],
            className
          )}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input } 