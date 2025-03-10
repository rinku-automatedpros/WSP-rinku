'use client'

import { useState } from 'react'
import { MainButton } from '@/components/mainButton'
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from '@/components/input'
import { PhoneInput } from '@/components/phoneInput'
import { MenuSection } from '@/components/menuSection'
import { CategoryManagementSection } from '@/components/categorySection'
import { Tab } from '@/components/tab'
import { IconButton } from '@/components/iconButton'
import { Grid2X2, LayoutGrid } from 'lucide-react'
import { AddIcon, RemoveIcon, CloseIcon, TableBarIcon, PersonIcon, ChevronDownIcon, MailIcon, TrashIcon } from "@/icons"
import { fontTitle1, fontTitle3, fontCaptionBold, fontCaptionNormal, fontBodyNormal, fontBodyBold, fontButtonSmall } from '@/styles/typography'
import { cn } from "@/lib/utils"
import SearchInput from "@/components/searchInput"
import { CustomSelect } from "@/components/select"
import { TableCard } from '@/components/liveCounterTableCard'

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  modifiers: { label: string; value: string }[]
}

const dummyMenuItems = [
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Sauce', value: 'A lot' }]
    },
    {
      id: '2',
      name: 'Pepperoni Pizza',
      price: 14.99,
      modifiers: [{ label: 'Size', value: 'Medium' }, { label: 'Extra Cheese', value: 'Yes' }]
    },
    {
      id: '3',
      name: 'BBQ Chicken Pizza',
      price: 15.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Onions', value: 'Extra' }]
    },
    {
      id: '4',
      name: 'Vegetarian Pizza',
      price: 13.99,
      modifiers: [{ label: 'Size', value: 'Medium' }, { label: 'Bell Peppers', value: 'Yes' }]
    },
    {
      id: '5',
      name: 'Hawaiian Pizza',
      price: 14.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Pineapple', value: 'Extra' }]
    },
    {
      id: '6',
      name: 'Meat Lovers Pizza',
      price: 16.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Meat', value: 'Extra' }]
    },
    {
      id: '7',
      name: 'Buffalo Wings',
      price: 9.99,
      modifiers: [{ label: 'Sauce', value: 'Hot' }, { label: 'Count', value: '12 pcs' }]
    },
    {
      id: '8',
      name: 'Garlic Bread',
      price: 4.99,
      modifiers: [{ label: 'Size', value: 'Regular' }, { label: 'Cheese', value: 'Yes' }]
    },
    {
      id: '9',
      name: 'Caesar Salad',
      price: 7.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Dressing', value: 'Extra' }]
    },
    {
      id: '10',
      name: 'Chocolate Cake',
      price: 6.99,
      modifiers: [{ label: 'Size', value: 'Slice' }, { label: 'Ice Cream', value: 'Yes' }]
    },
    {
      id: '11',
      name: 'Cheesecake',
      price: 7.99,
      modifiers: [{ label: 'Flavor', value: 'Classic' }, { label: 'Topping', value: 'Strawberry' }]
    },
    {
      id: '12',
      name: 'Tiramisu',
      price: 8.99,
      modifiers: [{ label: 'Size', value: 'Regular' }, { label: 'Coffee', value: 'Extra' }]
    },
    {
      id: '13',
      name: 'Spaghetti Carbonara',
      price: 13.99,
      modifiers: [{ label: 'Size', value: 'Regular' }, { label: 'Bacon', value: 'Extra' }]
    },
    {
      id: '14',
      name: 'Fettuccine Alfredo',
      price: 12.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Chicken', value: 'Yes' }]
    },
    {
      id: '15',
      name: 'Lasagna',
      price: 14.99,
      modifiers: [{ label: 'Size', value: 'Regular' }, { label: 'Cheese', value: 'Extra' }]
    },
    {
      id: '16',
      name: 'Greek Salad',
      price: 8.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Olives', value: 'Extra' }]
    },
    {
      id: '17',
      name: 'Chicken Soup',
      price: 5.99,
      modifiers: [{ label: 'Size', value: 'Bowl' }, { label: 'Crackers', value: 'Yes' }]
    },
    {
      id: '18',
      name: 'French Fries',
      price: 3.99,
      modifiers: [{ label: 'Size', value: 'Large' }, { label: 'Seasoning', value: 'Spicy' }]
    },
    {
      id: '19',
      name: 'Onion Rings',
      price: 4.99,
      modifiers: [{ label: 'Size', value: 'Regular' }, { label: 'Sauce', value: 'Ranch' }]
    },
    {
      id: '20',
      name: 'Mozzarella Sticks',
      price: 6.99,
      modifiers: [{ label: 'Count', value: '8 pcs' }, { label: 'Sauce', value: 'Marinara' }]
    }
  ]
  
  const dummyCategories = [
    {
      category_id: '1',
      category_name: 'Pizza',
      active_items_count: 10,
      inactive_items_count: 2,
      status: 'active'
    },
    {
      category_id: '2',
      category_name: 'Pasta',
      active_items_count: 8,
      inactive_items_count: 1,
      status: 'active'
    },
    {
      category_id: '3',
      category_name: 'Pasta',
      active_items_count: 10,
      inactive_items_count: 2,
      status: 'active'
    },
    {
      category_id: '4',
      category_name: 'Panjabi',
      active_items_count: 8,
      inactive_items_count: 1,
      status: 'active'
    }
  ]
  
  const dummyMenus = [
    {
      menu_id: '1',
      menu_name: 'Main Menu',
      active_items_count: 20,
      inactive_items_count: 5
    },
    {
      menu_id: '2',
      menu_name: 'Special Menu',
      active_items_count: 10,
      inactive_items_count: 2
    }
  ]
type TableLocation = "All table" | "Main hall" | "Terace" | "River side" | "Sea view"
type SortOption = "ascending" | "descending" | "occupied" | "empty"

const sortOptions = [
  { value: "ascending", label: "Table No. Ascending" },
  { value: "descending", label: "Table No. Descending" },
  { value: "occupied", label: "Occupied First" },
  { value: "empty", label: "Empty First" }
]
export function AddNewOrder() {
  const [activeTab, setActiveTab] = useState('table')
  const [showTableList, setShowTableList] = useState(false)
  const [showGuestInfo, setShowGuestInfo] = useState(false)
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isSmallIconView, setIsSmallIconView] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeSubTab, setActiveSubTab] = useState<TableLocation>("All table")
  const [sortBy, setSortBy] = useState<SortOption>("ascending")
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQuery1, setSearchQuery1] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('US')

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleAddToCart = (menuItem: typeof dummyMenuItems[0]) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...menuItem, quantity: 1 }]
    })
  }

  const tabs = [
    { id: 'table', label: 'Table' },
    { id: 'pickup', label: 'Pickup' },
    { id: 'delivery', label: 'Delivery' }
  ]

  return (
    <>
      {/* Table Selection Section */}
      {showTableList && (
        <div className="fixed inset-0 z-50">
          <div className="h-full flex flex-col">
            <div className="sticky top-0 border-b p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`${fontTitle1} text-black-100`}>Select Table Number</h2>
                <IconButton
                  variant="transparent"
                  onClick={() => setShowTableList(false)}
                  icon={CloseIcon}
                  className="bg-white-100"
                />
              </div>

              <div className="flex justify-between items-center">
                {/* Table menu list on the left */}
                <div className="flex gap-4 bg-white-100 rounded-6">
                  {(["All table", "Main hall", "Terace", "River side", "Sea view"]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSubTab(tab as any)}
                      className={cn(
                        "h-[48px] min-w-[80px] px-3 py-2 rounded-6",
                        fontCaptionBold,
                        activeSubTab === tab ? "bg-[#FF5634] text-white-100" : "bg-white-60 text-black-60"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* CustomSelect and SearchInput on the right */}
                <div className="flex items-center gap-4">
                <CustomSelect
                        options={sortOptions}
                        defaultValue={sortOptions[0]}
                        sortByText="Sort by"
                        menuPosition="left"
                        onOptionSelect={(option) => setSortBy(option.value as SortOption)}
                        selectWidth="w-[200px]"
                        menuWidth="w-[200px]"
                    />
                  <SearchInput 
                    query={searchQuery1}
                    setQuery={setSearchQuery1}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-10 gap-4">
                {Array.from({ length: 44 }, (_, i) => i + 1).map((num) => {
                  // Simulate different table statuses
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
                      section_name={activeSubTab === "All table" ? "Main Hall" : activeSubTab}
                      no_of_capacity={4}
                      isSmallIconView={true}
                      isChecked={selectedTable === num}
                      onClick={() => {
                        setSelectedTable(num)
                        setShowTableList(false)
                      }}
                      searchTerm={searchQuery1}
                      table_order={tableStatus.table_order}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={cn(
        "flex h-screen w-full",
        showTableList && "hidden"
      )}>
        {/* Left Section */}
        <div className="relative mt-4 ml-4 h-[calc(100vh-32px)] max-w-[315px] flex flex-col gap-4 rounded-3 bg-white-100 p-4">
          <h1 className={`${fontTitle1} text-black-100`}>Add New Order</h1>
          
          <div className="flex h-full flex-col">
            <div className="flex gap-2 mb-4">
              {tabs.map(tab => (
                <Tab
                  key={tab.id}
                  variant="primary"
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    fontCaptionBold,
                    activeTab === tab.id ? "bg-[#FF5634] text-white-100" : "bg-white-100 text-black-100"
                  )}
                >
                  {tab.label}
                </Tab>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              {activeTab === 'table' && (
                <Input
                  placeholder="Table Number"
                  value={selectedTable ? `Table ${selectedTable}` : 'Select Table'}
                  onClick={(e) => setShowTableList(true)}
                  icon={TableBarIcon}
                  onChange={() => {}}
                />
              )}
              <Input
                placeholder="Add Guest Info"
                onClick={(e) => setShowGuestInfo(true)}
                icon={PersonIcon}
                value=""
                onChange={() => {}}
              />
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center sticky top-0 z-10 bg-white-100 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`${fontCaptionBold} text-black-60`}>Items</span>
                    <span className={`${fontCaptionBold} bg-black-100 text-white-100 px-2 py-1 rounded-full`}>
                      {cartItems.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCartItems([])}>
                    <TrashIcon className="w-5 h-5 text-[#E10E0E]" />
                    <span className={`${fontButtonSmall} text-[#E10E0E]`}>
                      Remove All
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white-100 border border-black-10 rounded-[16px] p-3 mb-2">
                      <div className="flex justify-between items-center">
                        <span className={`${fontCaptionBold} text-black-100`}>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <IconButton
                            variant="transparent"
                            iconSize="20"
                            size="small"
                            onClick={() => {
                              setCartItems(prev => 
                                prev.map(i => 
                                  i.id === item.id 
                                    ? { ...i, quantity: Math.max(0, i.quantity - 1) }
                                    : i
                                ).filter(i => i.quantity > 0)
                              )
                            }}
                            icon={RemoveIcon}
                            className="bg-black-10 rounded-full"
                          />
                          <span className={`${fontBodyBold} text-black-100`}>{item.quantity}</span>
                          <IconButton
                            variant="transparent"
                            iconSize="20"
                            size="small"
                            onClick={() => {
                              setCartItems(prev => 
                                prev.map(i => 
                                  i.id === item.id 
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                                )
                              )
                            }}
                            icon={AddIcon}
                            className="bg-black-10 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.modifiers.map((mod, idx) => (
                          <div 
                            key={idx}
                            className="bg-black-5 rounded-6 px-2 py-1"
                          >
                            <span className={`${fontCaptionNormal} text-black-40`}>{mod.label}: </span>
                            <span className={`${fontCaptionNormal} text-black-100`}>{mod.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white-100 pt-4 border-t mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`${fontBodyNormal} text-black-100`}>Total</span>
                    <span className={`${fontBodyBold} text-black-100`}>${totalAmount.toFixed(2)}</span>
                  </div>
                  <MainButton variant="primary" className="w-full">
                    <span className={fontBodyBold}>Place Order</span>
                  </MainButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 border-b px-6 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <SearchInput 
                  query={searchQuery}
                  setQuery={setSearchQuery}
                />
                <IconButton
                  variant="transparent"
                  onClick={() => setIsSmallIconView(!isSmallIconView)}
                  icon={isSmallIconView ? LayoutGrid : Grid2X2}
                />
              </div>
              <div className="flex items-center gap-4">
                <IconButton
                  variant="primaryWhite"
                  onClick={() => window.history.back()}
                  icon={CloseIcon}
                  className="shadow-[0px_0px_84px_0px_#00000080]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-0 shrink-0">
              <MenuSection
                selectedMenu={selectedMenu}
                handleMenuSelect={setSelectedMenu}
                _dummyData={dummyMenus}
              />
              <CategoryManagementSection
                selectedCategory={selectedCategory}
                handleCategorySelect={(categoryId) => setSelectedCategory(categoryId)}
                menuId={selectedMenu || ""}
                categoryStatus={['active']}
                showBothCounts={true}
                updateCategoryDetails={true}
                _dummyData={dummyCategories}
              />
            </div>
          </div>

          {/* Menu Items Masonry Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className={cn(
              "p-4 grid auto-rows-[minmax(120px,auto)] gap-4",
              isSmallIconView 
                ? "grid-cols-5 auto-rows-[minmax(60px,auto)]"
                : "grid-cols-5"
            )}>
              {dummyMenuItems.map(item => {
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id)
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "bg-white-70 rounded-3 shadow hover:shadow-md transition-shadow relative",
                      isSmallIconView 
                        ? "p-3 flex items-center justify-between"
                        : "p-4 flex flex-col",
                      cartItem && "border-l-4 border-brand"
                    )}
                  >
                    <div className={cn(
                      "text-left",
                      isSmallIconView ? "flex-1" : "mb-4"
                    )}>
                      <h3 className={`${fontCaptionBold} text-black-100`}>{item.name}</h3>
                    </div>
                    {!isSmallIconView && (
                      <div className="flex items-center justify-between mt-auto">
                        <p className={`${fontCaptionNormal} text-black-60`}>${item.price.toFixed(2)}</p>
                        <div className="relative">
                          <IconButton
                            variant="transparent"
                            onClick={() => handleAddToCart(item)}
                            icon={AddIcon}
                            iconSize="20"
                            size="small"
                            className="rounded-full flex items-center justify-center"
                          />
                          {cartItem && (
                            <div className={`absolute -top-2 -left-1 w-4 h-4 rounded-full bg-black-100 text-white-100 flex items-center justify-center ${fontCaptionBold}`}>
                              {cartItem.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {isSmallIconView && (
                      <div className="relative">
                        <IconButton
                          variant="transparent"
                          onClick={() => handleAddToCart(item)}
                          icon={AddIcon}
                          iconSize="20"
                          size="small"
                          className="rounded-full flex items-center justify-center"
                        />
                        {cartItem && (
                          <div className={`absolute -top-2 -left-1 w-4 h-4 rounded-full bg-black-100 text-white-100 flex items-center justify-center ${fontCaptionBold}`}>
                            {cartItem.quantity}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Guest Info Dialog */}
        <Dialog.Root open={showGuestInfo} onOpenChange={setShowGuestInfo}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white-100 rounded-lg w-[400px] max-h-[90vh] overflow-auto z-[51]">
              <Dialog.Title className={`${fontTitle3} text-black-100 p-6 border-b sticky top-0 bg-white-100 z-[52]`}>
                Add Guest Information
              </Dialog.Title>
              <div className="p-6 space-y-4">
                <Input 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  icon={PersonIcon}
                />
                <Input 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  icon={PersonIcon}
                />
                <PhoneInput 
                  value={phone}
                  onChange={(value, country) => {
                    setPhone(value)
                    setCountryCode(country.code)
                  }}
                  selectedCountryCode={countryCode}
                />
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  icon={MailIcon}
                />
                <MainButton variant="primary" className="w-full" onClick={() => setShowGuestInfo(false)}>
                  <span className={fontBodyBold}>Save</span>
                </MainButton>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  )
} 