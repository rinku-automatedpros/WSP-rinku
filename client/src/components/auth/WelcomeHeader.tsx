import Image from 'next/image'
import { fontTitle1, fontTitle2, fontBodyNormal, fontCaptionBold } from '@/styles/typography'

interface WelcomeHeaderProps {
  authMode: 'email' | 'otp'
}

export function WelcomeHeader({ authMode }: WelcomeHeaderProps) {
  return (
    <>
      <div className="lg:hidden flex flex-col items-center pt-4">
        <div className="flex items-center space-x-2">
          <Image src="/OrangeLogo.svg" alt="Logo" width={53.2} height={38.97} />
          <span className={`${fontTitle2} text-brand`}>Orderific</span>
        </div>
        <h2 className={`${fontTitle1} text-black-100 mt-2`}>Service Panel</h2>
      </div>

      <div className="text-center mb-4">
        <h1 className={`${fontTitle1} mb-2`}>Welcome Back</h1>
        <p className={`${fontBodyNormal} text-black/60`}>
          Manage, streamline, and thrive effortlessly.
        </p>
        {authMode === 'otp' && (
          <p className={`mt-4 text-black/60 ${fontCaptionBold}`}>
            <span>Enter</span><span className="font-normal"> 6 digit pin</span>
          </p>
        )}
      </div>
    </>
  )
} 