'use client';

import React from 'react';
import OrderDetails from '@/components/OrderItemDetails';
import BillingDetails from '@/components/BillingDetails';
import { IconButton } from '@/components/iconButton';
import { EditIcon, TrashIcon, TableBarIcon, CloseIcon, PersonIcon, TagIcon, CheckCircleIcon, ScheduleIcon, MailIcon, ReceiptLongIcon, LocationIcon, InfoIcon } from "@/icons";
import { cn } from '@/lib/utils';
import { fontButtonSmall, fontCaptionNormal, fontBodyNormal, fontCaptionBold } from '@/styles/typography';

const DeliveryOrderPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 flex flex-col p-4 lg:pt-4 lg:pr-4 lg:pb-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold">Delivery Order</h2>
            <IconButton
              icon={EditIcon}
              variant="secondary"
              text="Edit Order"
              size="small"
              className={cn("py-2 px-4 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
            />
            <IconButton
              icon={TrashIcon}
              variant="secondary"
              text="Cancel Order"
              size="small"
              className={cn("py-2 px-4 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
            />
          </div>
          <IconButton
            icon={CloseIcon}
            variant="secondary"
            className='bg-white-100 text-black-100'
          />
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
          {/* First three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <PersonIcon className="w-4 h-4" />
                User Name
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>Marry Romero</p>
            </div>
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <TagIcon className="w-4 h-4" />
                Order Number
              </p>
              <div className={cn(fontBodyNormal, "text-black-100 flex items-center justify-between")}>
                <span>204</span>
                <span className={cn(fontCaptionBold, "bg-semantic-green-20 text-semantic-green px-2 py-1 rounded-lg")}>Paid</span>
              </div>
            </div>
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <CheckCircleIcon className="w-4 h-4" />
                Status
              </p>
              <p className={cn(
                "w-[75px] h-[24px] rounded-2xl px-2 gap-1 flex items-center justify-center",
                "bg-status-ordered text-white-100",
                fontBodyNormal
              )}>
                Ordered
              </p>
            </div>
          </div>
          {/* Second three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <ScheduleIcon className="w-4 h-4" />
                Date & Time
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>4 Mar, 2024 — 14:32</p>
            </div>
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <ReceiptLongIcon className="w-4 h-4" />
                Phone Number
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>+91 8978458585</p>
            </div>
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <MailIcon className="w-4 h-4" />
                Email Address
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>text@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Additional Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          {/* First Info Card - Address */}
          <div className="bg-black-5 rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <LocationIcon className="w-4 h-4" />
                Address
              </span>
              <span className={cn(fontCaptionNormal, "text-primary-blue cursor-pointer")}>Location on map</span>
            </div>
            <p className={cn(fontBodyNormal, "text-black-100 mb-2")}>
              Chinnaiyan Colony, Poongavanapuram, Chennai, Tamil Nadu 600003, India
            </p>
          </div>

          {/* Second Info Card - Delivery Instructions */}
          <div className="bg-black-5 rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <ReceiptLongIcon className="w-4 h-4" />
                Delivery Instruction
              </span>
            </div>
            <p className={cn(fontBodyNormal, "text-black-100")}>
              Deliver to the back entrance of the building, near the parking lot. Contact me upon arrival for further instructions.
            </p>
          </div>
        </div>

        {/* Content Row - Split into 2/3 and 1/3 */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3">
            <OrderDetails />
          </div>
          <div className="w-full lg:w-1/3">
            <BillingDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOrderPage;
