import Image from 'next/image'
import { fontBigTypoDesktop, fontBodyNormal } from '@/styles/typography'

export function AuthBanner() {
  return (
    <div className="hidden flex lg:flex relative lg:w-[40%] max-w-[480px] rounded-[var(--round-6)] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/signin.png')] bg-cover bg-top bg-no-repeat" />
      <div className="absolute inset-0 bg-signIn" />
      <div className="absolute inset-0 h-[50%] self-end opacity-60 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_50%,#000_100%)]" />
      <div className="relative flex flex-col w-full min-h-full">
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
  )
} 