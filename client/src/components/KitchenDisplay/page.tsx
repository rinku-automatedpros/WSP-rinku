"use client"
import { Tab as CustomTab } from '@/components/tab';
import SearchInputField from "../searchInput"
import { OrderCard as MealCard } from '@/components/orderCard';
import MasonryLayout from 'react-masonry-css';
import { useState as useStateHook } from 'react';
import { OrderStatuses as Statuses } from '@/constants/orderStatuses';
import { OrderType as MealType, OrderTypeLabels as MealTypeLabels } from '@/constants/orderTypes';
import { cn as classNames } from "@/lib/utils"
import { fontBodyNormal as bodyFont, fontCaptionBold as captionFont, fontTitle1 as titleFont } from "@/styles/typography"
import { CustomSelect } from '../select';
import { OrderStatusStats } from '../orderStatusStats';

// Dummy data for demonstration
const sampleOrders = [
  {
    order_id: "ORD-001",
    order_type: MealType.DINE,
    order_number: "101",
    payment_status: "paid",
    table: "Table 1",
    order_status: Statuses.ORDERED,
    time: "2024-03-04 14:30:45",
    item_details: [
      {
        id: "1",
        name: "Chicken Burger",
        item_status: Statuses.ORDERED,
        item_instruction: "Extra cheese",
        item_quantity: 1,
        price: 12.99,
        main_item_image: null
      },
      {
        id: "2",
        name: "French Fries",
        item_status: Statuses.ORDERED,
        item_instruction: null,
        item_quantity: 1,
        price: 4.99,
        main_item_image: null
      }
    ],
    edit_time_ago: "1 min ago",
    order_instructions: ""
  },
  {
    order_id: "ORD-002",
    order_type: MealType.DELIVERY,
    order_number: "102",
    payment_status: "paid",
    order_status: Statuses.ACCEPTED,
    time: "2024-03-04 14:25:30",
    item_details: [
      {
        id: "3",
        name: "Margherita Pizza",
        item_status: Statuses.ACCEPTED,
        item_instruction: "Extra crispy",
        item_quantity: 1,
        price: 14.99,
        main_item_image: null
      },
      {
        id: "4",
        name: "Garlic Bread",
        item_status: Statuses.READY,
        item_instruction: null,
        item_quantity: 1,
        price: 3.99,
        main_item_image: null
      },
      {
        id: "5",
        name: "Coke",
        item_status: Statuses.READY,
        item_instruction: null,
        item_quantity: 1,
        price: 2.49,
        main_item_image: null
      }
    ],
    edit_time_ago: "5 mins ago",
    order_instructions: ""
  },
  {
    order_id: "ORD-003",
    order_type: MealType.PICKUP,
    order_number: "103",
    payment_status: "pending",
    order_status: Statuses.READY,
    time: "2024-03-04 14:20:15",
    item_details: [
      {
        id: "6",
        name: "Grilled Chicken Salad",
        item_status: Statuses.READY,
        item_instruction: null,
        item_quantity: 1,
        price: 11.99,
        main_item_image: null
      },
      {
        id: "7",
        name: "Iced Tea",
        item_status: Statuses.READY,
        item_instruction: null,
        item_quantity: 1,
        price: 2.99,
        main_item_image: null
      }
    ],
    edit_time_ago: "10 mins ago",
    order_instructions: ""
  },
  {
    order_id: "ORD-004",
    order_type: MealType.DINE,
    order_number: "104",
    payment_status: "unpaid",
    table: "Table 5",
    order_status: Statuses.SERVED,
    time: "2024-03-04 14:15:00",
    item_details: [
      {
        id: "8",
        name: "Beef Steak",
        item_status: Statuses.SERVED,
        item_instruction: "Medium rare",
        item_quantity: 1,
        price: 24.99,
        main_item_image: null
      },
      {
        id: "9",
        name: "Mashed Potatoes",
        item_status: Statuses.SERVED,
        item_instruction: null,
        item_quantity: 1,
        price: 4.99,
        main_item_image: null
      },
      {
        id: "10",
        name: "Green Salad",
        item_status: Statuses.SERVED,
        item_instruction: null,
        item_quantity: 1,
        price: 5.99,
        main_item_image: null
      }
    ],
    edit_time_ago: "15 mins ago",
    order_instructions: ""
  },
  {
    order_id: "ORD-005",
    order_type: MealType.AGGREGATOR,
    order_number: "105",
    payment_status: "paid",
    order_status: Statuses.ORDERED,
    time: "2024-03-04 14:35:00",
    item_details: [
      {
        id: "11",
        name: "Sushi Roll",
        item_status: Statuses.ORDERED,
        item_instruction: null,
        item_quantity: 1,
        price: 16.99,
        main_item_image: null
      },
      {
        id: "12",
        name: "Miso Soup",
        item_status: Statuses.ORDERED,
        item_instruction: null,
        item_quantity: 1,
        price: 3.99,
        main_item_image: null
      },
      {
        id: "13",
        name: "Green Tea",
        item_status: Statuses.READY,
        item_instruction: null,
        item_quantity: 1,
        price: 2.49,
        main_item_image: null
      }
    ],
    edit_time_ago: "Just now",
    order_instructions: ""
  }
];

const mealTypeFilters = [...Object.values(MealType)] as readonly MealType[];
type MealTypeFilter = MealType | 'all';

const getMealFilterLabel = (type: MealTypeFilter) => {
  return MealTypeLabels[type as MealType];
};

const sortingOptions = [
  { label: "Latest First", value: "latest" },
  { label: "Earliest First", value: "earliest" },
  { label: "Status Ascending", value: "status_asc" },
  { label: "Status Descending", value: "status_desc" },
];

export default function KitchenDisplay() {
  const [searchInput, setSearchInput] = useStateHook('');
  const [currentSort, setCurrentSort] = useStateHook<string | null>(null);
  const [currentStatus, setCurrentStatus] = useStateHook('');
  const [currentTab, setCurrentTab] = useStateHook<'open' | 'completed'>('open');
  const [currentMealType, setCurrentMealType] = useStateHook<MealTypeFilter>('all');
  const [filterSettings, setFilterSettings] = useStateHook({
    order_status: [Statuses.ORDERED, Statuses.ACCEPTED, Statuses.READY, Statuses.SERVED].join(',')
  });

  const orderStatistics = [
    { number: 5, text: Statuses.ORDERED },
    { number: 3, text: Statuses.ACCEPTED },
    { number: 2, text: Statuses.READY },
    { number: 1, text: Statuses.SERVED },
  ];

  // Filter orders based on selected meal type
  const filteredOrders = sampleOrders.filter(order => {
    // Filter by meal type
    if (currentMealType !== 'all' && order.order_type !== currentMealType) {
      return false;
    }

    // Filter by order status
    if (currentStatus && order.order_status !== currentStatus) {
      return false;
    }

    return true;
  });

  const handleStatusChange = (status: Statuses | "") => {
    setCurrentStatus(status);
    setFilterSettings(prev => ({
      ...prev,
      order_status: status || [Statuses.ORDERED, Statuses.ACCEPTED, Statuses.READY, Statuses.SERVED].join(',')
    }));
  };

  const handleMealTypeChange = (type: MealTypeFilter) => {
    setCurrentMealType(type);
  };

  const breakpointColumns = {
    default: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="h-[88px] py-7 px-4 flex items-center justify-between relative">
        <h1 className={classNames(titleFont, "text-black-100")}>Kitchen Display</h1>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="flex gap-4 px-6">
            <CustomTab 
              variant="primary" 
              onClick={() => setCurrentTab('open')}
              className={classNames(bodyFont,
                currentTab === 'open' ? 'bg-black-100 text-white-100' : 'bg-white-100 text-black-100'
              )}
            >
              Open <span className={classNames(
                "absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white-100 text-black-100",
                captionFont
              )}>5</span>
            </CustomTab>
            <CustomTab 
              variant="primary" 
              onClick={() => setCurrentTab('completed')}
              className={classNames(bodyFont,
                currentTab === 'completed' ? 'bg-black-100 text-white-100' : 'bg-white-100 text-black-100'
              )}
            >
              Completed <span className={classNames(
                "absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white-100 text-black-100",
                captionFont
              )}>10</span>
            </CustomTab>
          </div>
        </div>

        <SearchInputField
          query={searchInput}
          setQuery={setSearchInput}
          className="w-full md:w-64"
          alwaysOpen={false}
          width="w-64"
        />
      </header>

      {/* Filters & Sorting Section */}
      <div className="px-4 flex justify-between items-center">
        <div className="rounded-6 bg-white-100 flex gap-2">
          {mealTypeFilters.map(type => (
            <CustomTab 
              key={type} 
              variant="secondary" 
              onClick={() => handleMealTypeChange(type)}
              className={classNames(captionFont,
                currentMealType === type ? 'bg-[#FF5634] text-white-100' : 'bg-white-100 text-black-100'
              )}
            >
              {getMealFilterLabel(type)}
            </CustomTab>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <OrderStatusStats
            statuses={orderStatistics}
            selectedStatus={currentStatus}
            onStatusSelect={handleStatusChange}
          />
          <CustomSelect
            options={sortingOptions}
            sortByText="Sort by"
            defaultValue={sortingOptions[0]}
            onOptionSelect={(option) => setCurrentSort(option.value)}
            selectWidth="w-48"
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="masonry-scroll-container flex-grow overflow-y-auto rounded-5 p-4">
        <MasonryLayout
          breakpointCols={breakpointColumns}
          className="flex gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {filteredOrders.map((order) => (
            <MealCard
              key={order.order_id}
              orderId={order.order_id}
              orderNumber={order.order_number}
              paymentStatus={order.payment_status}
              table={order.table}
              time={order.time}
              status={order.order_status}
              items={order.item_details}
              editTimeAgo={order.edit_time_ago}
              orderInstructions={order.order_instructions}
              searchTerm={searchInput}
              filters={filterSettings}
              orderType={order.order_type}
            />
          ))}
        </MasonryLayout>
      </div>
    </div>
  );
}