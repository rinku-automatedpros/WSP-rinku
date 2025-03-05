import Dashboard from "@/components/Dashboard/Dashboard"

interface DashboardPage {
  params: { locale: string }
}

export default function Page({ params }: DashboardPage) {
  return <Dashboard />
}
