import { useSplit } from "../context/SplitContext"

export default function ExpenseList() {
  const { expenses, participants } = useSplit()

  const getName = (id) =>
    participants.find((p) => p.id === id)?.name || "Unknown"

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Expenses</h2>

      <div className="space-y-4">
        {expenses.length === 0 && (
          <p className="text-sm text-gray-500">No expenses yet.</p>
        )}

        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium">{expense.description}</p>
              <p className="text-xs text-gray-500">
                Paid by {getName(expense.paidBy)} •{" "}
                {expense.participants.length} people
              </p>
            </div>

            <span className="font-semibold">
              ₹{expense.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
