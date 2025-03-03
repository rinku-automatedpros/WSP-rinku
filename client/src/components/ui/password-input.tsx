"use client"

import React, { useState } from "react"
import { Input } from "./input"
import Image from "next/image"

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  variant?: "default" | "signin"
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "Password",
  variant = "default"
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant={variant}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <Image
          src={showPassword ? "/eye.svg" : "/eyeoff.svg"}
          alt={showPassword ? "Show password" : "Hide password"}
          width={20}
          height={20}
          className="opacity-60 hover:opacity-100 transition-opacity"
        />
      </button>
    </div>
  )
} 