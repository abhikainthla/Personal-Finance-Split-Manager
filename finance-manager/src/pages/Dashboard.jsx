import Navbar from "../components/Navbar"
import ParticipantList from "../components/ParticipantList"
import ExpenseList from "../components/ExpenseList"
import BalanceSummary from "../components/BalanceSummary"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      
      <Navbar />

      <div className="w-full px-8 py-8 space-y-6">
        <BalanceSummary />

        <div className="grid grid-cols-2 gap-6">
          <ParticipantList />
          <ExpenseList />
        </div>
      </div>
    </div>
  )
}
