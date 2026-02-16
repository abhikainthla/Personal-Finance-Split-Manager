import React, { useMemo } from "react"
import { useSplit } from "../context/SplitContext"

const History = () => {
  const { expenses, participants } = useSplit()

  const summary = useMemo(() => {
    const totalExpenses = expenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    )

    const totalPaid = participants.reduce(
      (sum, p) => sum + p.totalPaid,
      0
    )

    const totalShare = participants.reduce(
      (sum, p) => sum + p.totalShare,
      0
    )

    const totalBalance = participants.reduce(
      (sum, p) => sum + p.balance,
      0
    )

    return {
      totalExpenses,
      totalPaid,
      totalShare,
      totalBalance,
    }
  }, [expenses, participants])

  return (
    <div className="w-full min-h-screen mx-auto bg-gray-50 p-8 space-y-8">

      <h1 className="text-2xl font-semibold">Expense History</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-semibold mt-1">
            ₹{summary.totalExpenses}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-xl font-semibold mt-1 text-green-600">
            ₹{summary.totalPaid}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Share</p>
          <p className="text-xl font-semibold mt-1 text-orange-600">
            ₹{summary.totalShare}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Net Balance</p>
          <p
            className={`text-xl font-semibold mt-1 ${
              summary.totalBalance === 0
                ? "text-gray-700"
                : "text-blue-600"
            }`}
          >
            ₹{summary.totalBalance}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">
          All Expenses
        </h2>

        {expenses.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No expenses recorded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {expenses
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt) -
                  new Date(a.createdAt)
              )
              .map((expense) => {
                const payer = participants.find(
                  (p) => p.id === expense.paidBy
                )

                return (
                  <div
                    key={expense.id}
                    className="shadow-sm rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {expense.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Paid by {payer?.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{expense.amount}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(
                          expense.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>

    </div>
  )
}

export default History
