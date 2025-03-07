"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import {
    fontTitle1,
    fontCaptionBold,
    fontCaptionNormal
} from "@/styles/typography"
import { Tab } from "@/components/tab"
import SearchInput from "@/components/searchInput"
import { MenuSection } from "@/components/menuSection"
import { CategoryManagementSection } from "@/components/categorySection"
import ToggleSwitch from "@/components/toggleSwitch"
import { CategoryDetails } from "@/types/interfaces/categoryDetails.interface"

// Service types for tabs
const serviceTypes = [
    { id: "all", label: "All Services", count: 18 },
    { id: "dine-in", label: "Dine-in", count: 3 },
    { id: "delivery", label: "Delivery", count: 2 },
    { id: "pickup", label: "Pickup", count: 11 }
]

// Dummy menu data to match the screenshot
const dummyMenus = [
    { menu_id: "1", menu_name: "Breakfast", active_items_count: 34, inactive_items_count: 0 },
    { menu_id: "2", menu_name: "Lunch", active_items_count: 80, inactive_items_count: 0 },
    { menu_id: "3", menu_name: "Dinner", active_items_count: 84, inactive_items_count: 0 }
]

// Dummy categories data to match the screenshot
const dummyCategories = [
    { category_id: "1", category_name: "Kebab", active_items_count: 16, inactive_items_count: 0, status: "active" },
    { category_id: "2", category_name: "Burgers", active_items_count: 13, inactive_items_count: 0, status: "active" },
    { category_id: "3", category_name: "Pizza", active_items_count: 8, inactive_items_count: 0, status: "active" },
    { category_id: "4", category_name: "Soups", active_items_count: 7, inactive_items_count: 0, status: "active" },
    { category_id: "5", category_name: "Salads", active_items_count: 11, inactive_items_count: 0, status: "active" },
    { category_id: "6", category_name: "Pasta", active_items_count: 3, inactive_items_count: 0, status: "active" },
    { category_id: "7", category_name: "Desserts", active_items_count: 4, inactive_items_count: 0, status: "active" },
    { category_id: "8", category_name: "Sandwiches", active_items_count: 4, inactive_items_count: 0, status: "active" },
    { category_id: "9", category_name: "Appetizers", active_items_count: 9, inactive_items_count: 0, status: "active" },
    { category_id: "10", category_name: "Seafood", active_items_count: 7, inactive_items_count: 0, status: "active" },
    { category_id: "11", category_name: "Steaks", active_items_count: 5, inactive_items_count: 0, status: "active" },
    { category_id: "12", category_name: "Drinks", active_items_count: 12, inactive_items_count: 0, status: "active" },
    { category_id: "13", category_name: "Sides", active_items_count: 8, inactive_items_count: 0, status: "active" },
    { category_id: "14", category_name: "Kids Menu", active_items_count: 6, inactive_items_count: 0, status: "active" },
    { category_id: "15", category_name: "Breakfast", active_items_count: 10, inactive_items_count: 0, status: "active" },
    { category_id: "16", category_name: "Lunch Specials", active_items_count: 8, inactive_items_count: 0, status: "active" },
    { category_id: "17", category_name: "Dinner Sets", active_items_count: 5, inactive_items_count: 0, status: "active" },
    { category_id: "18", category_name: "Vegan", active_items_count: 7, inactive_items_count: 0, status: "active" },
    { category_id: "19", category_name: "Gluten Free", active_items_count: 6, inactive_items_count: 0, status: "active" },
    { category_id: "20", category_name: "Hot Beverages", active_items_count: 4, inactive_items_count: 0, status: "active" },
    { category_id: "21", category_name: "Cold Beverages", active_items_count: 5, inactive_items_count: 0, status: "active" },
    { category_id: "22", category_name: "Seasonal Items", active_items_count: 3, inactive_items_count: 0, status: "active" }
]

// Dummy menu items
const generateDummyMenuItems = () => {
    return Array.from({ length: 40 }, (_, i) => ({
        id: `item-${i + 1}`,
        title: "Double Cheese",
        price: "$22.50",
        isActive: Math.random() > 0.3 // 70% chance of being active
    }))
}

export default function MenuManagement() {
    // States
    const [selectedService, setSelectedService] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedMenu, setSelectedMenu] = useState<string | null>("1") // Set a default menu ID
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [menuItems, setMenuItems] = useState(() => generateDummyMenuItems()) // Use function to initialize
    const [categoryActive, setCategoryActive] = useState(true)
    const [isClient, setIsClient] = useState(false)

    // Use useEffect to handle client-side-only updates
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const handleCategorySelect = (categoryId: string, details?: CategoryDetails) => {
        setSelectedCategory(categoryId)
    }

    const handleToggleItem = (itemId: string) => {
        setMenuItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, isActive: !item.isActive }
                    : item
            )
        )
    }

    return (
        <div className="flex h-screen flex-col mx-4 lg:mx-6">
            {/* Header Section */}
            <header className="relative flex h-[96px] items-center justify-between shrink-0">
                <h1 className={cn(fontTitle1, "text-black-100")}>Menu Management</h1>

                {/* Service Type Tabs - Absolute positioning for desktop */}
                <div className={cn(
                    "flex flex-wrap xl:flex-nowrap md:flex-row xl:w-fit",
                    "xl:absolute left-1/2 flex xl:-translate-x-1/2 xl:transform gap-4"
                )}>
                    {serviceTypes.map((service) => (
                        <Tab
                            key={service.id}
                            variant="primary"
                            isActive={selectedService === service.id}
                            onClick={() => setSelectedService(service.id)}
                            badgeCount={service.count}
                        >
                            {service.label}
                        </Tab>
                    ))}
                </div>

                {/* Search Input */}
                <SearchInput
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    width="w-[250px]"
                />
            </header>

            {/* Filter Section */}
            <div className="flex flex-col gap-0 shrink-0">
                {/* Menu Section */}
                <div className="flex flex-wrap gap-4 p-4 border-b border-black-10">
                    {dummyMenus.map((menu) => (
                        <Tab
                            key={`menu-${menu.menu_id}`}
                            aria-selected={selectedMenu === menu.menu_id}
                            badgeCount={menu.active_items_count + menu.inactive_items_count}
                            isActive={selectedMenu === menu.menu_id}
                            onClick={() => setSelectedMenu(menu.menu_id)}
                        >
                            <p className="line-clamp-2 max-h-[3rem] overflow-hidden">
                                {menu.menu_name}
                            </p>
                        </Tab>
                    ))}
                </div>
                <div
                    className="scrollbar-hide flex min-h-[80px] w-full items-center gap-4 overflow-x-auto rounded-5 bg-black-10 p-4 shadow-inset-right"
                >
                    {dummyCategories.map((category) => (
                        <Tab
                            key={`category-${category.category_id}`}
                            aria-selected={selectedCategory === category.category_id}
                            badgeCount={category.active_items_count + category.inactive_items_count}
                            isActive={selectedCategory === category.category_id}
                            onClick={() =>
                                handleCategorySelect(
                                    category.category_id,
                                    {
                                        name: category.category_name,
                                        itemsCount: category.active_items_count + category.inactive_items_count,
                                        status: category.status === "active",
                                    }
                                )
                            }
                        >
                            <p className="line-clamp-2 max-h-[3rem] overflow-hidden">
                                {category.category_name}
                            </p>
                        </Tab>
                    ))}
                </div>

            </div>

            {/* Category Header Section */}
            <div className="mt-3 flex items-center justify-between rounded-3 bg-white-70 p-4 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-2">
                    <span className={cn(fontCaptionBold, "text-black-100")}>
                        Whole &quot;Burgers&quot; Category
                    </span>
                    <span className={cn(fontCaptionNormal, "text-black-60")}>
                        12 items
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {isClient && (
                        <ToggleSwitch
                            label={categoryActive ? "Active" : "Inactive"}
                            checked={categoryActive}
                            onChange={setCategoryActive}
                            labelPosition="right"
                            labelClassName={cn(fontCaptionNormal, "text-black-100")}
                        />
                    )}
                </div>
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1 min-h-0 mt-4">
                <div className="h-full masonry-scroll-container grid grid-cols-2 gap-4 overflow-y-auto md:grid-cols-4 lg:grid-cols-5">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-start gap-4 rounded-3 bg-white-70 p-4 backdrop-blur-sm"
                        >
                            <div className="flex flex-col gap-1">
                                <span className={cn(fontCaptionBold, "text-black-100")}>
                                    {item.title}
                                </span>
                                <span className={cn(fontCaptionNormal, "text-black-60")}>
                                    {item.price}
                                </span>
                            </div>
                            {isClient && (
                                <ToggleSwitch
                                    label={item.isActive ? "Active" : "Inactive"}
                                    checked={item.isActive}
                                    onChange={() => handleToggleItem(item.id)}
                                    labelPosition="right"
                                    labelClassName={cn(fontCaptionNormal, "text-black-100")}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
