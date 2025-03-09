import KitchenDisplay from "@/components/KitchenDisplay/page"

interface KitchenDisplayProps {
  params: { locale: string }
}

export default function Page({ params }: KitchenDisplayProps) {
  return (
    <div className="w-full">
      <KitchenDisplay />
    </div>
  )
}
