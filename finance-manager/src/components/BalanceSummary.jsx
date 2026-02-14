import { useSplit } from "../context/SplitContext"

export default function BalanceSummary() {
  const { participants, expenses } = useSplit()

  const totalExpense = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  )

  const peopleOwe = participants.filter((p) => p.balance < 0)
  const peopleGet = participants.filter((p) => p.balance > 0)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">
        Balance Summary
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Total Expenses: ₹{totalExpense}
      </p>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <h3 className="text-sm font-semibold text-red-600 mb-2">
            Owes
          </h3>
          {peopleOwe.map((p) => (
            <p key={p.id} className="text-sm">
              {p.name}: ₹{Math.abs(p.balance)}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-green-600 mb-2">
            Gets Back
          </h3>
          {peopleGet.map((p) => (
            <p key={p.id} className="text-sm">
              {p.name}: ₹{p.balance}
            </p>
          ))}
        </div>

      </div>
    </div>
  )
}
