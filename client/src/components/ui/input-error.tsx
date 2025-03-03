import React from 'react'
import { cn } from "@/lib/utils"

interface InputErrorProps {
  message: string;
  className?: string;
  variant?: 'default' | 'center';
}

export const InputError: React.FC<InputErrorProps> = ({ 
  message, 
  className = '',
  variant = 'default'
}) => {
  return (
    <div className={cn(
      'flex items-center gap-1',
      variant === 'center' && 'justify-center',
      className
    )}>
      <div className="relative w-4 h-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(45deg)' }}
          className="absolute inset-0"
        >
          <rect 
            x="4"
            y="4"
            width="8"
            height="8"
            fill="var(--text-semantic-red)"
          />
        </svg>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <path
            d="M8 5.5L8 8.5M8 10L8 10.5"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-[var(--text-semantic-red)] text-sm font-medium">{message}</span>
    </div>
  )
} 