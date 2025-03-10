import React, { useEffect, useRef } from "react"
import { CategoryStatus } from "@/api/categories"
import { useAuth } from "@/providers/AuthProvider/AuthProvider"

import { CategoryDetails } from "@/types/interfaces/categoryDetails.interface"
import { useGetCategoriesInfinite } from "@/lib/hooks/queries/categories/useGetCategoriesInfinite"
import { Tab } from "@/components/tab"

interface CategoryManagementSectionProps {
  selectedCategory: string | null
  handleCategorySelect: (
    categoryId: string,
    categoryDetails?: CategoryDetails
  ) => void
  menuId: string | null
  updateCategoryDetails?: boolean
  categoryStatus: CategoryStatus
  showBothCounts?: boolean
  _dummyData?: Array<{
    category_id: string
    category_name: string
    active_items_count: number
    inactive_items_count: number
    status: string
  }>
}

export function CategoryManagementSection({
  selectedCategory,
  handleCategorySelect,
  menuId,
  updateCategoryDetails = false,
  categoryStatus,
  showBothCounts,
  _dummyData,
}: CategoryManagementSectionProps) {
  const { brandId } = useAuth()

  const {
    data: categoriesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCategoriesInfinite({
    brand_id: brandId || "",
    menu_id: menuId || "",
    page_limit: 20,
    search: "",
    status: categoryStatus,
  })

  // Use dummy data if provided, otherwise use fetched data
  const categories = _dummyData || categoriesData?.pages.flatMap((page) => page.data) || []
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)

  const handleWheel = (
    ref: React.RefObject<HTMLDivElement>,
    e: React.WheelEvent
  ) => {
    if (ref.current) {
      ref.current.scrollLeft += e.deltaY
    }
  }

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const firstValidCategory = categories.find((category) =>
        showBothCounts
          ? category.active_items_count > 0 || category.inactive_items_count > 0
          : category.active_items_count > 0
      )

      if (firstValidCategory) {
        if (updateCategoryDetails) {
          handleCategorySelect(firstValidCategory.category_id, {
            name: firstValidCategory.category_name,
            itemsCount: showBothCounts
              ? firstValidCategory.active_items_count +
                firstValidCategory.inactive_items_count
              : firstValidCategory.active_items_count,
            status: firstValidCategory.status === "active",
          })
        } else {
          handleCategorySelect(firstValidCategory.category_id)
        }
      }
    }
  }, [
    categories,
    selectedCategory,
    handleCategorySelect,
    showBothCounts,
    updateCategoryDetails,
  ])

  // Only set up intersection observer if we're not using dummy data
  useEffect(() => {
    if (_dummyData) return // Skip if using dummy data

    const currentEndRef = endRef.current

    if (!currentEndRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: scrollRef.current,
        rootMargin: "0px 100px",
        threshold: 0.1,
      }
    )

    observer.observe(currentEndRef)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, _dummyData])

  return (
    <div
      className="scrollbar-hide flex min-h-[80px] w-full items-center gap-4 overflow-x-auto rounded-5 bg-black-10 p-4 shadow-inset-right"
      onWheel={(e) => handleWheel(scrollRef, e)}
      ref={scrollRef}
    >
      {categories
        .filter((category) =>
          showBothCounts
            ? category.active_items_count > 0 ||
              category.inactive_items_count > 0
            : category.active_items_count > 0
        )
        .map((category) => (
          <Tab
            key={`category-${category.category_id}`}
            aria-selected={selectedCategory === category.category_id}
            badgeCount={
              showBothCounts
                ? category.active_items_count + category.inactive_items_count
                : category.active_items_count
            }
            isActive={selectedCategory === category.category_id}
            onClick={() =>
              handleCategorySelect(
                category.category_id,
                updateCategoryDetails
                  ? {
                      name: category.category_name,
                      itemsCount: showBothCounts
                        ? category.active_items_count +
                          category.inactive_items_count
                        : category.active_items_count,
                      status: category.status === "active",
                    }
                  : undefined
              )
            }
          >
            <p className="line-clamp-2 max-h-[3rem] overflow-hidden">
              {category.category_name}
            </p>
          </Tab>
        ))}

      {/* Only show marker for IntersectionObserver when not using dummy data */}
      {!_dummyData && <div ref={endRef} className="w-1" />}
    </div>
  )
}
