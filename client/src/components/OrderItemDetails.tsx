import React from 'react';
import { cn } from '@/lib/utils';
import { fontCaptionBold, fontBodyNormal, fontCaptionNormal } from '@/styles/typography';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  totalPrice: number;
  discount?: number;
  notes?: string;
}

const OrderDetails = () => {
  const orderItems: OrderItem[] = [
    { 
      name: 'Buffalo Burger',
      qty: 1,
      price: 22.50,
      totalPrice: 22.50,
      notes: 'Pickles: No'
    },
    { 
      name: 'Cheese Burger',
      qty: 1,
      price: 22.50,
      totalPrice: 22.50,
      notes: 'Size: Small, Cheese: A little bit, Salt: No'
    },
    { 
      name: 'Double Chicken Burger + French fries',
      qty: 2,
      price: 22.50,
      totalPrice: 22.50
    },
    { 
      name: 'Soda',
      qty: 8,
      price: 2.25,
      totalPrice: 20.00
    },
    { 
      name: 'Texas Meatlover',
      qty: 1,
      price: 16.50,
      totalPrice: 33.00,
      discount: 2.00,
      notes: 'Size: Small, Cheese: A little bit, Salt: No'
    }
  ];

  return (
    <div className="bg-white-60 rounded-2xl px-4 pt-4 pb-2 h-full">
      <div className="rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-black-5">
              <th className={cn("w-[35%] text-left py-4 pl-6 rounded-l-[16px]", fontCaptionBold, "text-black-60")}>Items Summary</th>
              <th className={cn("w-[10%] text-left py-4", fontCaptionBold, "text-black-60")}>QTY</th>
              <th className={cn("w-[15%] text-left py-4", fontCaptionBold, "text-black-60")}>Price</th>
              <th className={cn("w-[15%] text-left py-4", fontCaptionBold, "text-black-60")}>Total Price</th>
              <th className={cn("w-[15%] text-left py-4", fontCaptionBold, "text-black-60")}>Discount</th>
              <th className={cn("w-[10%] py-4 rounded-r-[16px]", fontCaptionBold, "text-black-60")}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-10">
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td className="py-4 pl-6 pr-2">
                  <div>
                    <p className={cn(fontBodyNormal, "text-black-100 break-words")}>{item.name}</p>
                    {item.notes && (
                      <p className={cn(fontCaptionNormal, "text-black-60 mt-1 break-words")}>{item.notes}</p>
                    )}
                  </div>
                </td>
                <td className={cn("py-4 px-2", fontBodyNormal, "text-black-100")}>{item.qty}</td>
                <td className={cn("py-4 px-2", fontBodyNormal, "text-black-100")}>${item.price.toFixed(2)}</td>
                <td className={cn("py-4 px-2", fontBodyNormal, "text-black-100")}>${item.totalPrice.toFixed(2)}</td>
                <td className="py-4 px-2">
                  {item.discount && (
                    <span className={cn(fontBodyNormal, "text-semantic-green")}>${item.discount.toFixed(2)}</span>
                  )}
                </td>
                <td className="py-4 px-2 text-center">
                  <button className="w-8 h-8 lg:w-10 lg:h-10 border border-black-10 rounded-full flex items-center justify-center hover:bg-gray-50">
                    <span className="text-lg lg:text-xl">+</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails; 