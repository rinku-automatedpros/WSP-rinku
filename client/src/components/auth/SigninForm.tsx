'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { MainButton } from '@/components/mainButton'
import { fontCaptionBold, fontBodyNormal } from '@/styles/typography'

interface SigninFormProps {
  toggleAuthMode: () => void
}

export function SigninForm({ toggleAuthMode }: SigninFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isFormValid = email && password

  return (
    <>
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

      <div className="flex items-center justify-between mb-4">
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
        <button
          type="button"
          onClick={toggleAuthMode}
          className="font-dm-sans font-bold text-black underline"
        >
          Login with Code
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