'use client'

import { useState } from 'react'
import { SigninForm } from '@/components/auth/SigninForm'
import { OtpForm } from '@/components/auth/OtpForm'
import { AuthBanner } from '@/components/auth/AuthBanner'
import { WelcomeHeader } from '@/components/auth/WelcomeHeader'

export default function SignInPage() {
  const [authMode, setAuthMode] = useState<'email' | 'otp'>('email')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (authMode === 'otp') {
      // TODO: Handle OTP verification
      setError('Entered code is wrong!')
    } else {
      // TODO: Handle email/password login
    }
  }

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'email' ? 'otp' : 'email')
    setError(null)
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full p-2 font-dm-sans">
      <AuthBanner />
      <div className="flex flex-col w-full lg:w-[60%] min-h-[inherit] lg:min-h-0">
        <div className="flex flex-col flex-1 justify-center w-full max-w-[360px] mx-auto">
          <WelcomeHeader authMode={authMode} />
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {authMode === 'email' ? (
              <SigninForm
                toggleAuthMode={toggleAuthMode}
              />
            ) : (
              <OtpForm
                error={error}
                setError={setError}
                toggleAuthMode={toggleAuthMode}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 