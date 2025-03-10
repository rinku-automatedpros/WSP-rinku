import React, { useEffect, useRef } from "react"
import { useAuth } from "@/providers/AuthProvider/AuthProvider"

import { useGetMenusInfinite } from "@/lib/hooks/queries/menu/useGetMenusInfinite"
import { MenuItem } from "@/components/menuItem"

interface MenuSectionProps {
  selectedMenu: string | null
  handleMenuSelect: (menuId: string) => void
  _dummyData?: Array<{
    menu_id: string
    menu_name: string
    active_items_count: number
    inactive_items_count: number
  }>
}

export function MenuSection({
  selectedMenu,
  handleMenuSelect,
  _dummyData,
}: MenuSectionProps) {
  const { brandId } = useAuth()

  const {
    data: menusData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMenusInfinite({
    brand_id: brandId || "",
    page_limit: 50,
    search: "",
  })

  // Use dummy data if provided, otherwise use fetched data
  const menus = _dummyData 
    ? _dummyData.map(menu => ({
        id: menu.menu_id,
        name: menu.menu_name,
        active_items_count: menu.active_items_count,
        inactive_items_count: menu.inactive_items_count
      }))
    : menusData?.pages.flatMap((page) => page.data) || []

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
    if (menus.length > 0 && !selectedMenu) {
      handleMenuSelect(menus[0].id)
    }
  }, [menus, selectedMenu, handleMenuSelect])

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
      ref={scrollRef}
      onWheel={(e) => handleWheel(scrollRef, e)}
      className="scrollbar-hide mx-8 overflow-x-auto"
    >
      <div className="flex min-h-[64px] w-full gap-2">
        {menus.map((menu) => (
          <MenuItem
            key={`menu-${menu.id}`}
            aria-selected={selectedMenu === menu.id}
            onClick={() => handleMenuSelect(menu.id)}
            isActive={selectedMenu === menu.id}
            className="min-w-[160px]"
          >
            <p className="line-clamp-2 max-h-[3rem] overflow-hidden break-words">
              {menu.name}
            </p>
          </MenuItem>
        ))}
        {/* Only show marker for IntersectionObserver when not using dummy data */}
        {!_dummyData && <div ref={endRef} className="w-1" />}
      </div>
    </div>
  )
}

