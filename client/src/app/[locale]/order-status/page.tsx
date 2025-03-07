'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { FullscreenIcon } from "@/icons"
import { fontButtonSmall, fontHeadline, fontTitle1, fontBodyBold } from '@/styles/typography'

export default function OrderStatus() {
  const [currentTime, setCurrentTime] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Mock data for orders
  const preparingOrders = Array(13).fill('3885')
  const readyOrders = Array(11).fill('3885')

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Handle fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullScreen(true)
    } else {
      document.exitFullscreen()
      setIsFullScreen(false)
    }
  }

  return (

    <div className="flex min-h-screen flex-col px-4">
      <div className="flex items-center justify-between px-4 pt-7">
            <h1 className={cn("font-medium", fontTitle1)}>Order Status</h1>
            <div className="flex gap-2">
            <button
              onClick={toggleFullScreen}
              className={cn(
                fontButtonSmall,
                "flex items-center gap-4 rounded-6 border border-black-10 py-2 pl-3 pr-4 hover:bg-black-5 transition-colors"
              )}
            >
              <FullscreenIcon /> FullScreen
            </button>
            </div>
        </div>
      <div className="w-full pl-4">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3 pr-3 rounded-5 bg-black-5 my-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-[60px] w-[60px] rounded-full">
              <AvatarImage
                src="/mcdonalds-logo.png"
                className="h-auto w-full max-w-[100px] rounded-full"
              />
            </Avatar>
            <h3 className={cn(fontHeadline)}>McDonald's</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className={cn(fontTitle1, "text-black-100")}>{currentTime}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pr-4">
          {/* Preparing Section */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Preparing</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {preparingOrders.map((order, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-center font-medium"
                >
                  <span className={cn("text-black-100", fontBodyBold)}>{order}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ready Section */}
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-center">Ready</h2>
            <div className="mb-4">
              <div className="rounded-lg bg-green-600 px-6 py-3 text-center text-2xl font-bold text-white">
                {readyOrders[0]}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {readyOrders.slice(1).map((order, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white"
                >
                  {order}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
