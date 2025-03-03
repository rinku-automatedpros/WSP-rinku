'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { MainButton } from '@/components/mainButton'
import {
  fontBigTypoDesktop,
  fontTitle1,
  fontTitle2,
  fontBodyNormal,
  fontCaptionBold,
} from '@/styles/typography'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isFormValid = email && password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row p-2 font-dm-sans">
      {/* Left Column - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[40%] max-w-[480px] relative rounded-[var(--round-6)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/signin.png')] bg-cover bg-top bg-no-repeat" />
        <div className="absolute inset-0 bg-signIn" />
        <div className="absolute inset-0 h-[50%] opacity-60 self-end bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_50%,#000_100%)]" />
        <div className="relative flex flex-col min-h-full w-full">
          <div className="p-6">
            <Image src="/Logo.webp" alt="Logo" width={164} height={39} />
          </div>
          <div className="mt-auto p-6 text-white">
            <h1 className={`${fontBigTypoDesktop} mb-6`}>Service Panel</h1>
            <p className={fontBodyNormal}>
              Streamline your restaurant operations with BMS. Manage reservations, orders, inventory, and staff effortlessly, and focus on delivering exceptional dining experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-full lg:w-[60%] min-h-[inherit] lg:min-h-0">
        {/* Mobile Logo Section */}
        <div className="lg:hidden flex flex-col items-center pt-4">
          <div className="flex items-center space-x-2">
            <Image src="/OrangeLogo.svg" alt="Logo" width={53.2} height={38.97} />
            <span className={`${fontTitle2} text-brand`}>Orderific</span>
          </div>
          <h2 className={`${fontTitle1} text-black-100 mt-2`}>Service Panel</h2>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-[360px] mx-auto">
          <div className="text-center mb-4">
            <h1 className={`${fontTitle1} mb-2`}>Welcome Back</h1>
            <p className={`${fontBodyNormal} text-black/60`}>
              Manage, streamline, and thrive effortlessly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <label className={`${fontCaptionBold} text-black-60 pl-4 block`}>
                Email
              </label>
              <Input
                type="email"
                variant="signin"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className={`${fontCaptionBold} text-black-60 pl-4 block`}>
                Password
              </label>
              <PasswordInput
                variant="signin"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  variant="custom"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  
                />
                <label className={`${fontBodyNormal} text-gray-700 ml-2`}>
                  Remember me
                </label>
              </div>
              <Link
                href="/login-with-code"
                className="font-dm-sans font-bold text-black underline"
              >
                Login with Code
              </Link>
            </div>

            <MainButton variant="primary" type="submit" className={`w-full py-3 px-4 rounded-[30px] mt-4 ${
                isFormValid
                  ? 'bg-black text-white hover:opacity-90'
                  : 'bg-black/5 text-black/40 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              Sign In
            </MainButton>
          </form>
        </div>
      </div>
    </div>
  )
}
