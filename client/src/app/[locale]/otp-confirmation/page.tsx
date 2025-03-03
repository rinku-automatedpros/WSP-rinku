"use client"

import { useState } from "react"
import { CloseIcon, SearchIcon } from "@/icons"

import { cn } from "@/lib/utils"
import { MainButton } from "@/components/mainButton"
import IconWrapper from "@/components/iconWrapper"
import SearchInput from "@/components/searchInput"
import { Badge } from "@/components/badge"
import { fontBodyBold, fontBodyNormal, fontTitle1, fontTitle3 } from "@/styles/typography"

interface Rider {
  id: string
  name: string
  time: string
  otp?: string
  image?: string
}

const mockRiders: Rider[] = [
  {
    id: "296571905",
    name: "Nasser Alsubai",
    time: "9 Feb 2024 — 10:24",
    otp: "674951",
    image: "/rider.png"
  },
  {
    id: "296571906",
    name: "Nguyen, Shane",
    time: "9 Feb 2024 — 10:20",
  },
  {
    id: "296571907",
    name: "Flores, Juanita",
    time: "9 Feb 2024 — 10:04",
  },
  {
    id: "296571908",
    name: "Miles, Esther",
    time: "9 Feb 2024 — 09:30",
  },
  {
    id: "296571909",
    name: "Miles, Esther",
    time: "9 Feb 2024 — 09:26",
  },
  {
    id: "296571910",
    name: "Black, Marvin",
    time: "9 Feb 2024 — 09:20",
  },
  {
    id: "296571911",
    name: "Cooper, Kristin",
    time: "9 Feb 2024 — 09:18",
  },
  {
    id: "296571912",
    name: "Flores, Juanita",
    time: "9 Feb 2024 — 09:07",
  },
  {
    id: "296571913",
    name: "Black, Marvin",
    time: "8 Feb 2024 — 22:20",
  },
  {
    id: "296571914",
    name: "Henry, Arthur",
    time: "8 Feb 2024 — 22:17",
  }
]

export default function OTPConfirmationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRider, setSelectedRider] = useState<Rider | null>(mockRiders[0]) // Set first rider as selected by default

  const handleClose = () => {
    setSelectedRider(null)
  }

  return (
    <main className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center px-6">
        <h1 className={cn(fontTitle1, "text-black-100")}>OTP Confirmation</h1>
      </header>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden p-4">
        <div className="flex h-full w-full overflow-hidden rounded-[25px] bg-white/60">
          {/* Left Panel */}
          <div className="flex h-full w-[360px] flex-col border-r border-black-10">
            {/* Search Header */}
            <div className="h-[60px] px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(fontBodyBold, "text-black-100")}>Pending</span>
                <Badge variant="black" size="small" count={1} />
              </div>
              <SearchInput
                query={searchQuery}
                setQuery={setSearchQuery}
                width="w-64"
                className="ml-auto"
              />
            </div>

            {/* Riders List */}
            <div className="flex-1 overflow-y-auto masonry-scroll-container divide-y divide-black-10">
              {mockRiders.map((rider) => (
                <div
                  key={rider.id}
                  className={cn(
                    "p-4 hover:bg-white cursor-pointer transition-colors",
                    selectedRider?.id === rider.id && "bg-white"
                  )}
                  onClick={() => setSelectedRider(rider)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-black-5 flex items-center justify-center caption-bold text-black-100">
                      {rider.image ? (
                        <img
                          src={rider.image}
                          alt={rider.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        rider.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        <span className={cn(fontBodyBold, "text-black-100 truncate")}>
                          {rider.name}
                        </span>
                        <span className={cn("caption-normal text-black-60")}>
                          {rider.time}
                        </span>
                      </div>
                    </div>
                    {rider.otp && (
                      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-semantic-red-100" />
                        <span className={cn(fontBodyBold, "text-black-100")}>
                          {rider.otp}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 h-full">
            {selectedRider ? (
              <>
                {/* Header with Close Button */}
                <div className="h-[60px] px-4 flex items-center border-black-10">
                  <button
                    onClick={handleClose}
                    className={cn(
                      fontBodyBold,
                      "text-black-100 underline hover:text-black-60 transition-colors"
                    )}
                  >
                    Close
                  </button>
                </div>

                {/* Selected Rider Content */}
                <div className="h-[calc(100%-60px)] overflow-y-auto masonry-scroll-container">
                  <div className="max-w-[600px] mx-auto py-12 px-8 flex flex-col items-center">
                    <div className="h-[120px] w-[120px] rounded-full bg-black-5 mb-4 flex items-center justify-center">
                      {selectedRider.image ? (
                        <img
                          src={selectedRider.image}
                          alt={selectedRider.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className={cn(fontTitle3, "text-black-100")}>
                          {selectedRider.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    <h2 className={cn(fontTitle3, "text-black-100 mb-1")}>
                      {selectedRider.name}
                    </h2>
                    <p className={cn(fontBodyNormal, "text-black-60 mb-8")}>
                      ID: {selectedRider.id}
                    </p>

                    {selectedRider.otp && (
                      <p className={cn(fontTitle1, "text-brand mb-4")}>
                        {selectedRider.otp}
                      </p>
                    )}

                    <p className={cn(fontBodyNormal, "text-black-100 text-center mb-6")}>
                      To accept cash transfers, the rider must enter this 4-digit code in their app before you can accept the transaction.
                    </p>

                    <p className={cn(fontBodyNormal, "text-black-100 text-center mb-2")}>
                      The amount you should receive:
                    </p>
                    <p className={cn(fontTitle1, "text-black-100 mb-6")}>
                      $86.60
                    </p>

                    <MainButton
                      className={cn(
                        fontBodyBold,
                        "rounded-full bg-black-5 px-6 py-3 hover:bg-black-10 transition-colors" 
                      )}
                      disabled
                      variant="primary"
                    >
                      Accept Cash Transfer
                    </MainButton>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center px-2">
                <p className={cn(fontBodyNormal, "bg-white rounded-[25px] p-2 text-black-60 text-center")}>
                  Select a rider to see info
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}