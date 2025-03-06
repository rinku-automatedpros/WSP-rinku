'use client'

import React, { useRef, useState } from "react"
import { notificationFilterOptions } from "@/constants/notificationFilterOptions"
import { Settings } from "@/types/interfaces/settings.interface"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/badge"
import SearchInput from "@/components/searchInput"
import { CustomSelect } from "@/components/select"
import RadioButton from "@/components/radioButton"
import ToggleSwitch from "@/components/toggleSwitch"
import {
  fontBodyNormal,
  fontCaptionBold,
  fontHeadline,
  fontTitle1,
} from "@/styles/typography"

interface Notification {
  id: string
  notification_title: string
  notification_body: string
  date: string
  time: string
  acknowledged: string | null
}

export default function Notification() {

  // State for storing settings
  const [settings, setSettings] = useState<Settings>({
    banner_and_sound: false,
    banner_only: false,
    sound_only: false,
    none: false,
    play_repeated: false,
    table_notification: false,
    order_notification: false,
  })

  // Near other state declarations
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const notifications: Notification[] = [
    {
      id: "1",
      notification_title: "New Order",
      notification_body: "Table 5 has placed a new order",
      date: "2024-03-20",
      time: "14:30:00",
      acknowledged: null
    },
    {
      id: "2",
      notification_title: "Payment Received",
      notification_body: "Payment confirmed for Order #123",
      date: "2024-03-20",
      time: "13:15:00",
      acknowledged: "2024-03-20T13:20:00Z"
    },
    {
      id: "3",
      notification_title: "Table Request",
      notification_body: "Table 3 requires assistance",
      date: "2024-03-20",
      time: "12:45:00",
      acknowledged: null
    },
    {
      id: "4",
      notification_title: "Kitchen Alert",
      notification_body: "Order #456 is ready for pickup",
      date: "2024-03-20",
      time: "12:30:00",
      acknowledged: "2024-03-20T12:35:00Z"
    }
  ];

  const filterOptions = [
    { label: "All", value: notificationFilterOptions.ALL },
    { label: "Unread", value: notificationFilterOptions.UNREAD },
  ]

  // Handle filter selection
  const handleFilterSelect = (option: { value: notificationFilterOptions; label: string }) => {
    console.log("Selected filter:", option.value)
  }

  const toggleSetting = (setting: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      banner_and_sound: setting === 'banner_and_sound',
      banner_only: setting === 'banner_only',
      sound_only: setting === 'sound_only',
      none: setting === 'none',
      play_repeated: setting === 'play_repeated',
      table_notification: setting === 'table_notification',
      order_notification: setting === 'order_notification',
      [setting]: !prev[setting]
    }))
  }

  return (
    <div className="flex min-h-screen flex-col px-4">

      <div className="flex items-center justify-between px-4 pt-7">
        <h1 className={cn("font-medium", fontTitle1)}>Notification</h1>
      </div>

      <div className="flex flex-row gap-4 p-4">
        {/* NotificationsList Section */}
        <div className="flex w-2/3 flex-col rounded-5 bg-white-60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className={cn(fontHeadline, "flex items-center gap-2")}>
              Unread
              <Badge
                count={notifications.filter((n) => !n.acknowledged).length}
                variant="black"
                size="small"
              />
            </div>
            <div className="flex items-center space-x-2">
              <CustomSelect<notificationFilterOptions>
                options={filterOptions}
                sortByText="Sort by:"
                menuPosition="left"
                onOptionSelect={handleFilterSelect}
                defaultValue={filterOptions[0]}
              />
              <div className="relative flex justify-end overflow-hidden">
                <SearchInput 
                  query={searchQuery}
                  setQuery={setSearchQuery}
                />
              </div>
            </div>
          </div>

          <div>
            <div
              className={cn(
                fontCaptionBold,
                "flex items-center justify-between rounded-6 bg-black-5 p-4"
              )}
            >
              <div className="flex-1 text-black-60">Description</div>
              <div className="mx-6 flex-shrink-0 text-black-60">Date</div>
              <div className="mx-8 flex-shrink-0 text-black-60">Time</div>
            </div>

            <div
              className="masonry-scroll-container h-[calc(100vh-275px)] overflow-y-auto"
            >
              {notifications.length === 0 ? (
                <div className="flex h-full items-center justify-center text-black-60">
                  No data available
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <React.Fragment key={`${notification.id}-${index}`}>
                    <div
                      className={`mb-2 flex items-center justify-between p-4 ${notification.acknowledged !== null
                        ? "cursor-default text-black-40"
                        : "cursor-pointer text-black-100"
                        }`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex-1">
                        <span className={`block ${cn(fontBodyNormal)}`}>
                          {notification.notification_title + ", " + notification.notification_body}
                        </span>
                      </div>
                      <div className="ml-8 flex flex-shrink-0 text-right">
                        <div className="mx-4 whitespace-nowrap">{notification.date}</div>
                        <div className="mx-4 whitespace-nowrap">{notification.time}</div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <hr />}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>

        {/* NotificationSettings Section */}
        <div className="flex w-1/3 flex-col gap-6 self-start rounded-5 bg-white-60 p-6">
          <h3 className={cn(fontHeadline, "mb-4 text-lg font-semibold")}>
            Settings
          </h3>
          <div className="flex items-center justify-between space-x-3">
            <span>Banner and sound</span>
            <RadioButton
              selected={settings.banner_and_sound}
              size="large"
              onClick={() => toggleSetting("banner_and_sound")}
            />
          </div>
          <div className="flex items-center justify-between space-x-3">
            <span>Banner only</span>
            <RadioButton
              selected={settings.banner_only}
              size="large"
              onClick={() => toggleSetting("banner_only")}
            />
          </div>
          <div className="flex items-center justify-between space-x-3">
            <span>Sound only</span>
            <RadioButton
              selected={settings.sound_only}
              size="large"
              onClick={() => toggleSetting("sound_only")}
            />
          </div>
          <div className="flex items-center justify-between space-x-3">
            <span>None</span>
            <RadioButton
              selected={settings.none}
              size="large"
              onClick={() => toggleSetting("none")}
            />
          </div>
          <hr />
          <ToggleSwitch
            label="Play Repeatedly"
            checked={settings.play_repeated}
            onChange={() => toggleSetting("play_repeated")}
          />
          <ToggleSwitch
            label="Table Notifications"
            checked={settings.table_notification}
            onChange={() => toggleSetting("table_notification")}
          />
          <ToggleSwitch
            label="Order Notifications"
            checked={settings.order_notification}
            onChange={() => toggleSetting("order_notification")}
          />
        </div>
      </div>
    </div>
  )
} 