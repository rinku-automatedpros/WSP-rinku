'use client';

import React from 'react';
import OrderDetails from '@/components/OrderItemDetails';
import BillingDetails from '@/components/BillingDetails';
import { IconButton } from '@/components/iconButton';
import { EditIcon, TrashIcon, TableBarIcon, CloseIcon, PersonIcon, TagIcon, CheckCircleIcon, ScheduleIcon } from "@/icons";
import { cn } from '@/lib/utils';
import { fontButtonSmall, fontCaptionNormal, fontBodyNormal } from '@/styles/typography';

const OrderPickupPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 flex flex-col p-4 lg:pt-4 lg:pr-4 lg:pb-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold">Pickup Order</h2>
            <IconButton
              icon={EditIcon}
              variant="secondary"
              text="Edit Order"
              size="small"
              className={cn("py-2 px-4 pr-3 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
            />
            <IconButton
              icon={TrashIcon}
              variant="secondary"
              text="Cancel Order"
              size="small"
              className={cn("py-2 px-4 pr-3 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
            />
          </div>
          <IconButton
            icon={CloseIcon}
            variant="secondary"
            className='bg-white-100 text-black-100'
          />
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-4">
          {/* First three cards in 2/3 width */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <PersonIcon className="w-4 h-4" />
                User Name
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>John Doe</p>
            </div>
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <TagIcon className="w-4 h-4" />
                Order Number
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>204</p>
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
          {/* Last card in 1/3 width */}
          <div className="col-span-1">
            <div className="bg-black-5 h-[90px] rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
              <p className={cn(fontCaptionNormal, "text-black-60 flex items-center gap-1")}>
                <ScheduleIcon className="w-4 h-4" />
                Date & Time
              </p>
              <p className={cn(fontBodyNormal, "text-black-100")}>4 Mar, 2024 — 14:32</p>
            </div>
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

export default OrderPickupPage;
