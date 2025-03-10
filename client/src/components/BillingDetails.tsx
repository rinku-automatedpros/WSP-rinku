import React from 'react';
import { cn } from '@/lib/utils';
import { fontCaptionNormal, fontCaptionBold, fontBodyNormal, fontBodyBold, fontButtonSmall, fontButtonLarge } from '@/styles/typography';
import { PrintIcon, ReceiptLongIcon } from '@/icons';
import { IconButton } from '@/components/iconButton';


const BillingDetails = () => {
  const invoice = {
    subtotal: 76.00,
    orderDiscount: 5.00,
    taxableAmount: 5.00,
    tax: 0.00,
    grandTotal: 76.00,
    total: 76.00
  };

  return (
    <div className="bg-black-60 rounded-2xl h-full flex flex-col">
      <div className="p-4 flex-1">
        <div className="space-y-3 max-w-sm mx-auto lg:mx-0">
          <div className="flex justify-between">
            <span className={cn(fontCaptionNormal, "text-black-100")}>Subtotal</span>
            <span className={cn(fontCaptionBold, "text-black-60")}>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className={cn(fontCaptionNormal, "text-black-100")}>Order Discount</span>
            <span className={cn(fontCaptionBold, "text-semantic-green")}>${invoice.orderDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className={cn(fontCaptionNormal, "text-black-100")}>Taxable Amount</span>
            <span className={cn(fontCaptionBold, "text-semantic-red")}>${invoice.taxableAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className={cn(fontCaptionNormal, "text-black-100")}>Tax (VAT 3%)</span>
            <span className={cn(fontCaptionBold, "text-semantic-red")}>${invoice.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className={cn(fontCaptionNormal, "text-black-100")}>Grand Total</span>
            <span className={cn(fontCaptionBold, "text-black-60")}>${invoice.grandTotal.toFixed(2)}</span>
          </div>
          <div>
            <button className={cn("w-[89px] h-[28px] bg-black-10 rounded-2xl transition-colors", fontButtonSmall, "text-black-100")}>
              + DISC%
            </button>
          </div>
          <div className="flex justify-between space-y-4">
            <span className={cn(fontBodyNormal, "text-black-60")}>Total</span>
            <span className={cn(fontBodyBold, "text-black-60")}>${invoice.total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 pb-6">
            <button className={cn(
              "w-[48px] h-[48px] rounded-[48px] border border-black-10",
              "flex items-center justify-center",
              "text-black-60 transition-colors"
            )}>
              <PrintIcon />
            </button>
            <button className={cn(
              "flex-1 h-[48px] rounded-[32px] px-8",
              "bg-status-rejected",
              fontButtonLarge,
              "text-white-100 transition-colors"
            )}>
              Pay Bill
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 border-t border-gray-200">
        <div>
          <h3 className={cn(fontCaptionBold, "text-black-100 mb-2")}>KOTs</h3>
          <div className="flex flex-wrap gap-2">
            <IconButton
              icon={ReceiptLongIcon}
              variant="secondary"
              text="Kitchen"
              size="small"
            />
            <IconButton
              icon={ReceiptLongIcon}
              variant="secondary"
              text="Bar"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails; 