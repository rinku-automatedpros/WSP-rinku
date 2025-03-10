import React, { useState } from 'react';
import { cn } from  "@/lib/utils";
import { fontTitle1, fontButtonLarge, fontBodyBold, fontCaptionBold, fontCaptionNormal } from '@/styles/typography';
import Checkbox from '@/components/checkbox';
import { MainButton } from '@/components/mainButton';

interface OrderItem {
  id: string;
  userName: string;
  status: 'Paid' | 'Served' | 'Ordered' | 'Accepted';
  time: string;
  label: 'Paid' | 'Served' | 'Ordered' | 'Accepted';
}

const Sidebar = () => {
  const [isMerging, setIsMerging] = useState(false);
  const [chosenOrders, setChosenOrders] = useState<string[]>([]);
  const orders: OrderItem[] = [
    { id: '203', userName: 'Sarah Hermant', label: 'Paid', status: 'Paid', time: '10 min ago' },
    { id: '204', userName: 'Marry Romero', label: 'Served', status: 'Served', time: '15 min ago' },
    { id: '203', userName: 'Guest 01', label: 'Ordered', status: 'Ordered', time: '12 min ago' },
    { id: '203', userName: 'Guest 02', label: 'Accepted', status: 'Accepted', time: '20 min ago' },
  ];

  const getStatusColor = (label: OrderItem['label'], isLabel = false) => {
    const colors = {
      Paid: isLabel 
        ? cn(fontCaptionBold, "bg-semantic-green-20 text-semantic-green")
        : cn(fontCaptionNormal, "text-semantic-green"),
      Served: cn(fontCaptionNormal, "text-status-served"),
      Ordered: cn(fontCaptionNormal, "text-status-ordered"),
      Accepted: cn(fontCaptionNormal, "text-status-accepted"),
    };
    return colors[label];
  };

  const handleSelectAll = () => {
    if (chosenOrders.length === orders.length) {
      setChosenOrders([]);
    } else {
      setChosenOrders(orders.map(order => order.id));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setChosenOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <>
      {/* Overlay */}
      {isMerging && (
        <div className="fixed inset-0 bg-black-60 z-40" />
      )}
      
      <aside className={cn(
        "w-full lg:w-80 p-4 gap-6",
        "bg-white-100 flex flex-col",
        "lg:mt-4 lg:ml-4 lg:rounded-3xl lg:h-[calc(100vh-2rem)]",
        "min-h-[300px]",
        isMerging && "relative z-50"
      )}>
        <h1 className="flex gap-2">
          <span className={cn(fontTitle1, "text-black-40")}>Table</span>
          <span className={cn(fontTitle1, "text-black-100")}>A5</span>
        </h1>
        
        <div className="flex items-center">
          <MainButton 
            variant="secondary"
            className='w-full'
          >
            Create New Order
          </MainButton>
        </div>
        {isMerging && (
          <div className="flex items-center gap-2">
              <Checkbox
                checked={chosenOrders.length === orders.length}
                onClick={handleSelectAll}
                size="small"
              />
              <span className={cn(fontBodyBold, "text-black-100")}>
                Select All
              </span>
          </div>
        )}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {orders.map((order, index) => (
            <div
              key={index}
              className={cn(
                "w-[283px] h-[64px] rounded-2xl p-2 gap-1",
                "bg-white-100 border border-black-10",
                "cursor-pointer transition-colors",
                order.status === 'Served' && "border-r-4 border-r-orange-500",
                isMerging && "hover:bg-black-5"
              )}
            >
              <div className="flex items-center gap-3">
                {isMerging && (
                  <Checkbox
                    checked={chosenOrders.includes(order.id)}
                    onClick={() => handleSelectOrder(order.id)}
                    size="small"
                  />
                )}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  order.status === 'Served' ? "bg-brand" : "bg-gray-200"
                )}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill={order.status === 'Served' ? "#FFFFFF" : "#666666"}/>
                    <path d="M8 9C5.67 9 1 10.17 1 12.5V14H15V12.5C15 10.17 10.33 9 8 9Z" fill={order.status === 'Served' ? "#FFFFFF" : "#000000"}/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={cn(fontBodyBold, "text-black-100")}>{order.userName}</h3>
                    {order.label === 'Paid' && (
                      <span className={cn("px-2 py-1 rounded-full", getStatusColor(order.label, true))}>
                        {order.label}
                      </span>
                    )}
                  </div>
                  <p className={cn(fontCaptionNormal, "text-black-60")}>
                    #{order.id}, <span className={getStatusColor(order.status)}>{order.status}</span>, {order.time}
                  </p>
                </div>
                {order.status === 'Served' && (
                  <div className="flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isMerging ? (
          <MainButton 
            variant="secondary"
            className='w-full'
            onClick={() => setIsMerging(true)}
          >
            Merge Orders
          </MainButton>
        ) : (
          <div className="flex flex-col gap-2">
            <MainButton 
              variant="secondary"
              className="w-full"
              onClick={() => {
                setIsMerging(false);
                setChosenOrders([]);
              }}
            >
              Cancel
            </MainButton>
            <MainButton 
              variant={chosenOrders.length >= 2 ? "primary" : "secondary"}
              className="w-full"
              disabled={chosenOrders.length < 2}
            >
              Merge
            </MainButton>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar; 