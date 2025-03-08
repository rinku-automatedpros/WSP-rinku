"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { fontBodyNormal, fontCaptionBold, fontCaptionNormal, fontTitle1 } from "@/styles/typography"
import { Grid2X2, GridIcon } from "lucide-react"
import { TableCard } from "@/components/liveCounterTableCard"
import SearchInput from "@/components/searchInput"
import { CustomSelect } from "@/components/select"


// Mock data types
type TableLocation = "All table" | "Main hall" | "Terace" | "River side" | "Sea view"
type OrderStatus = "Open order" | "Completed"
type ViewMode = "default" | "compact"
type SortOption = "ascending" | "descending" | "occupied" | "empty"

const sortOptions = [
  { value: "ascending", label: "Table No. Ascending" },
  { value: "descending", label: "Table No. Descending" },
  { value: "occupied", label: "Occupied First" },
  { value: "empty", label: "Empty First" }
]

// Mock data
const generateMockData = () => {
  const sections = ["Dining Area", "Outdoor Seating", "Bar", "VIP Lounge"]
  const orderStatuses = ["pending", "in progress", "completed", "canceled", null]
  const paymentStatuses = ["awaiting payment", "paid", "refunded"]
  
  return Array.from({ length: 35 }, (_, i) => {
    // Use deterministic values based on index
    const statusIndex = i % orderStatuses.length
    const sectionIndex = i % sections.length
    const paymentIndex = i % paymentStatuses.length
    
    return {
      id: `table-${i + 1}`,
      brand_id: "brand-1",
      user_id: "user-1",
      name: `Table ${i + 1}`,
      section_name: sections[sectionIndex],
      no_of_capacity: 2 + (i % 5), // 2-6 capacity
      table_order: orderStatuses[statusIndex] 
        ? {
            id: `order-${i + 1}`,
            status: orderStatuses[statusIndex] as string,
            payment_status: paymentStatuses[paymentIndex],
            order_count: String(1 + (i % 5)),
            order_time: new Date(Date.now() - (i * 3600000)).toISOString() // Staggered times
          }
        : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  })
}
export default function LiveCounter() {
  const [activeMainTab, setActiveMainTab] = useState<"Tables" | "Delivery" | "Pickup" | "Aggregators">("Tables")
  const [activeSubTab, setActiveSubTab] = useState<TableLocation | OrderStatus>("All table")
  const [viewMode, setViewMode] = useState<ViewMode>("default")
  const [sortBy, setSortBy] = useState<SortOption>("ascending")
  const [searchQuery, setSearchQuery] = useState("")
  const [showGridOptions, setShowGridOptions] = useState(false)
  const [badgeNumbers, setBadgeNumbers] = useState<Record<string, number>>({})
  const [mockData, setMockData] = useState<ReturnType<typeof generateMockData>>([])

  useEffect(() => {
    // Generate random numbers and mock data once on mount
    const numbers = ["Tables", "Delivery", "Pickup", "Aggregators"].reduce((acc, tab) => {
      acc[tab] = Math.floor(Math.random() * 10)
      return acc
    }, {} as Record<string, number>)
    setBadgeNumbers(numbers)
    
    // Generate mock data once
    setMockData(generateMockData())
  }, [])

  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* Header */}
      <div className="pt-7 px-4 flex items-center justify-between">
        {/* Left - Title */}
        <h1 className={cn(fontTitle1, "text-black-100")}>Live Counter</h1>
        
        {/* Center - Main Tabs */}
        <div className="flex-1 justify-center flex">
          <div className="pt-2 flex gap-4">
            {["Tables", "Delivery", "Pickup", "Aggregators"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMainTab(tab as any)}
                className={cn(
                  "px-4 h-[48px] min-w-[79px] relative rounded-6",
                  fontBodyNormal,
                  activeMainTab === tab ? "text-white-100 bg-black-100" : "bg-white-60 text-black-60"
                )}
              >
                <span>{tab}</span>
                <span className={cn(
                  "rounded-full -right-2 -top-2 absolute w-6 h-6 flex justify-center items-center bg-white-100",
                  fontCaptionBold,
                  "text-black-100"
                )}>
                  {badgeNumbers[tab] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Search */}
        <SearchInput
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>

      {/* Sub Tabs and Controls */}
      <div className="my-4 flex justify-between items-center">
        <div className="rounded-6 flex gap-4 bg-white-100">
          {(activeMainTab === "Tables" 
            ? ["All table", "Main hall", "Terace", "River side", "Sea view"]
            : ["Open order", "Completed"]
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab as any)}
              className={cn(
                "rounded-6 px-3 py-2 min-w-[80px] h-[48px]",
                fontCaptionBold,
                activeSubTab === tab ? "text-white-100 bg-[#FF5634]" : "text-black-60 bg-white-60"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="gap-4 flex items-center">
          <CustomSelect
            options={sortOptions}
            defaultValue={sortOptions[0]}
            sortByText="Sort by"
            menuPosition="left"
            onOptionSelect={(option) => setSortBy(option.value as SortOption)}
            selectWidth="w-[200px]"
            menuWidth="w-[200px]"
          />

          {/* Grid Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "default" ? "compact" : "default")}
            className={cn(
              "rounded-6 p-2",
              "text-white-100 bg-black-100"
            )}
          >
            {viewMode === "default" ? <Grid2X2 size={20} /> : <GridIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="overflow-hidden flex-1">
        <div className="pr-2 h-full overflow-y-auto">
          <div className={cn(
            "gap-4 grid",
            viewMode === "default" 
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
          )}>
            {mockData.map((table) => (
              <div key={table.id} className="break-inside-avoid">
                <TableCard
                  {...table}
                  searchTerm={searchQuery}
                  onClick={() => console.log("Table clicked:", table.id)}
                  isSmallIconView={viewMode === "compact"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 