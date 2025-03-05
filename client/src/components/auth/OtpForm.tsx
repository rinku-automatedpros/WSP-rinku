'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { InputError } from '@/components/ui/input-error'
import { MainButton } from '@/components/mainButton'

interface OtpFormProps {
  error: string | null
  setError: (error: string | null) => void
  toggleAuthMode: () => void
}

export function OtpForm({ error, setError, toggleAuthMode }: OtpFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))

  const isFormValid = otp.every(digit => digit !== '')

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus()
  }

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit numbers
    const sanitizedValue = value.replace(/[^0-9]/g, '')
    const singleDigit = sanitizedValue.slice(-1)

    const newOtp = [...otp]
    newOtp[index] = singleDigit

    setOtp(newOtp)
    setError(null)

    if (singleDigit && index < 5) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
      focusInput(index - 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const pastedNumbers = pastedData.replace(/[^0-9]/g, '').slice(0, 6)

    if (pastedNumbers) {
      const newOtp = [...otp]
      pastedNumbers.split('').forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit
      })
      setOtp(newOtp)
      
      // Focus last input or next empty input
      const nextEmptyIndex = newOtp.findIndex(digit => !digit)
      focusInput(nextEmptyIndex !== -1 ? nextEmptyIndex : 5)
    }
  }

  return (
    <>
      <div className="flex justify-center gap-[10px]">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            variant="otp"
            value={digit}
            ref={el => {
              inputRefs.current[index] = el
            }}
            onChange={e => handleOtpChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            error={!!error}
            hasValue={!!digit}
          />
        ))}
      </div>

      {error && (
        <InputError
          message={error}
          className="mt-4"
          variant="center"
        />
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={toggleAuthMode}
          className="font-bold text-black underline"
        >
          Login with Email
        </button>
      </div>

      <MainButton
        variant="primary"
        type="submit"
        className={`w-full py-3 px-4 rounded-[30px] mt-4 ${
          isFormValid
            ? 'bg-black text-white hover:opacity-90'
            : 'bg-black/5 text-black/40 cursor-not-allowed'
        }`}
        disabled={!isFormValid}
      >
        Sign In 
      </MainButton>
    </>
  )
} 