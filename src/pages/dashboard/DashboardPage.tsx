import PinjamanList from "@/features/pinjaman/PinjamanList"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <PinjamanList />
    </div>
  )
}