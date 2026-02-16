import { useState } from "react"
import { useSplit } from "../context/SplitContext"
import { Pencil, Trash2, Check, X } from "lucide-react"

export default function ExpenseList() {
  const { expenses, participants, updateExpense, deleteExpense } = useSplit()

  const [editingId, setEditingId] = useState(null)
  const [editedData, setEditedData] = useState({})

  const handleEditClick = (expense) => {
    setEditingId(expense.id)
    setEditedData(expense)
  }

  const handleSave = () => {
    updateExpense(editedData)
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Expenses</h2>

      {expenses.length === 0 && (
        <p className="text-sm text-gray-500">No expenses added yet.</p>
      )}

      <div className="space-y-4">
        {expenses.map((expense) => {
          const payer = participants.find(
            (p) => p.id === expense.paidBy
          )

          const isEditing = editingId === expense.id

          return (
            <div
              key={expense.id}
              className="shadow-sm rounded-lg p-4 flex justify-between items-center"
            >
              {isEditing ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={editedData.description}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        description: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    value={editedData.amount}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        amount: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Check size={16} />
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      ₹{expense.amount} • Paid by {payer?.name}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
