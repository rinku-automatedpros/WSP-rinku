'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Order/Sidebar';
import OrderDetails from '@/components/OrderItemDetails';
import BillingDetails from '@/components/BillingDetails';
import { IconButton } from '@/components/iconButton';
import { EditIcon, TrashIcon, TableBarIcon, CloseIcon, PersonIcon, TagIcon, CheckCircleIcon, ScheduleIcon } from "@/icons";
import { cn } from '@/lib/utils';
import { fontButtonSmall, fontCaptionNormal, fontBodyNormal, fontTitle1, fontCaptionBold, fontBodyBold } from '@/styles/typography';
import { TableCard } from '@/components/liveCounterTableCard';
import { CustomSelect } from "@/components/select";
import SearchInput from "@/components/searchInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/dialog";
import { MainButton } from "@/components/mainButton";

const TableOrderPage = () => {
  const [isTableListVisible, setIsTableListVisible] = useState(false);
  const [chosenTable, setChosenTable] = useState<number | null>(null);
  const [currentSubTab, setCurrentSubTab] = useState<"All table" | "Main hall" | "Terace" | "River side" | "Sea view">("All table");
  const [orderSortBy, setOrderSortBy] = useState<"ascending" | "descending" | "occupied" | "empty">("ascending");
  const [searchInput, setSearchInput] = useState('');
  const [isCancelDialogVisible, setIsCancelDialogVisible] = useState(false);

  const sortOptions = [
    { value: "ascending", label: "Table No. Ascending" },
    { value: "descending", label: "Table No. Descending" },
    { value: "occupied", label: "Occupied First" },
    { value: "empty", label: "Empty First" }
  ];

  const order = {
    id: '204',
    userName: 'Marry Romero',
    status: 'Served' as const,
    time: '15 min ago',
    label: 'Served' as const
  };

  return (
    <>
      <Dialog open={isCancelDialogVisible} onOpenChange={setIsCancelDialogVisible}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogClose asChild>
              <IconButton
                variant="primaryWhite"
                size="large"
                icon={CloseIcon}
                iconSize="24"
                isActive={true}
              />
            </DialogClose>
          </DialogHeader>
          <DialogDescription>
            Are you sure to cancel this order?
          </DialogDescription>
          
          {/* Order Details Card */}
          <div className={cn(
            "w-full h-[64px] rounded-2xl p-2 gap-1",
            "bg-white-100 border border-black-10",
            "mb-4"
          )}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center bg-gray-200"
              )}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="#666666"/>
                  <path d="M8 9C5.67 9 1 10.17 1 12.5V14H15V12.5C15 10.17 10.33 9 8 9Z" fill="#000000"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={cn(fontBodyBold, "text-black-100")}>{order.userName}</h3>
                </div>
                <p className={cn(fontCaptionNormal, "text-black-60")}>
                  #{order.id}, <span className="text-status-served">{order.status}</span>, {order.time}
                </p>
              </div>
            </div>
          </div>

          <MainButton
            variant="canceled"
            className="w-full"
            onClick={() => {
              // Handle cancel order logic here
              setIsCancelDialogVisible(false);
            }}
          >
            Cancel Order
          </MainButton>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Table Selection Overlay */}
        {isTableListVisible ? (
          <div className="fixed inset-0 z-50">
            <div className="h-full flex flex-col">
              <div className="sticky top-0 border-b p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={cn(fontTitle1, "text-black-100")}>Select Table Number</h2>
                  <IconButton
                    variant="transparent"
                    onClick={() => setIsTableListVisible(false)}
                    icon={CloseIcon}
                    className="bg-white-100"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4 bg-white-100 rounded-6">
                    {(["All table", "Main hall", "Terace", "River side", "Sea view"]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setCurrentSubTab(tab as any)}
                        className={cn(
                          "h-[48px] min-w-[80px] px-3 py-2 rounded-6",
                          fontCaptionBold,
                          currentSubTab === tab ? "bg-[#FF5634] text-white-100" : "bg-white-60 text-black-60"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <CustomSelect
                      options={sortOptions}
                      defaultValue={sortOptions[0]}
                      sortByText="Sort by"
                      menuPosition="left"
                      onOptionSelect={(option) => setOrderSortBy(option.value as any)}
                      selectWidth="w-[200px]"
                      menuWidth="w-[200px]"
                    />
                    <SearchInput 
                      query={searchInput}
                      setQuery={setSearchInput}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-10 gap-4">
                  {Array.from({ length: 44 }, (_, i) => i + 1).map((num) => {
                    const tableStatus = (() => {
                      if (num % 5 === 0) return { 
                        status: 'Ordered', 
                        table_order: { 
                          id: `order-${num}`,
                          status: 'ordered',
                          order_time: new Date().toISOString(),
                          order_count: '2',
                          payment_status: 'pending'
                        } 
                      }
                      if (num % 4 === 0) return { 
                        status: 'Ready', 
                        table_order: { 
                          id: `order-${num}`,
                          status: 'ready',
                          order_time: new Date().toISOString(),
                          order_count: '1',
                          payment_status: 'pending'
                        } 
                      }
                      if (num % 3 === 0) return { 
                        status: 'Accepted', 
                        table_order: { 
                          id: `order-${num}`,
                          status: 'accepted',
                          order_time: new Date().toISOString(),
                          order_count: '3',
                          payment_status: 'pending'
                        } 
                      }
                      return { status: 'Free' }
                    })()

                    return (
                      <TableCard
                        key={num}
                        id={num.toString()}
                        brand_id="1"
                        user_id="1"
                        name={`${num}`}
                        section_name={currentSubTab === "All table" ? "Main Hall" : currentSubTab}
                        no_of_capacity={4}
                        isSmallIconView={true}
                        isChecked={chosenTable === num}
                        onClick={() => {
                          setChosenTable(num);
                          setIsTableListVisible(false);
                        }}
                        searchTerm={searchInput}
                        table_order={tableStatus.table_order}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
            <><Sidebar />
          <div className="flex-1 flex flex-col p-4 lg:pt-4 lg:pr-4 lg:pb-4">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold">Order Details</h2>
                <IconButton
                  icon={EditIcon}
                  variant="secondary"
                  text="Edit Order"
                  size="small"
                  className={cn("py-2 px-4 py-2 pr-3 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
                />
                <IconButton
                  icon={TableBarIcon}
                  variant="secondary"
                  text={chosenTable ? `Table ${chosenTable}` : "Change Table"}
                  size="small"
                  onClick={() => setIsTableListVisible(true)}
                  className={cn("py-2 px-4 py-2 pr-3 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
                />
                <IconButton
                  icon={TrashIcon}
                  variant="secondary"
                  text="Cancel Order"
                  size="small"
                  onClick={() => setIsCancelDialogVisible(true)}
                  className={cn("py-2 px-4 py-2 pr-3 rounded-[48px] border border-black-10 gap-1 bg-transparent", fontButtonSmall, "text-black-100")}
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
                  <p className={cn(fontBodyNormal, "text-black-100")}>Marry Romero</p>
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
                    "w-[67px] h-[24px] rounded-2xl px-2 gap-1 flex items-center justify-center",
                    "bg-status-served text-white-100",
                    fontBodyNormal
                  )}>
                    Served
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
          </>
        )}

        
      </div>
    </>
  );
};
export default TableOrderPage;
