import * as Dialog from "@radix-ui/react-dialog"
import { X, PlusCircle, FileText, Users, Plus } from "lucide-react"
import { useState } from "react"
import { useSplit } from "../context/SplitContext"

export default function AddExpenseModal() {
  const { participants, addExpense } = useSplit()

  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState("")
  const [selected, setSelected] = useState([])

  const handleSubmit = () => {
    if (!description || !amount || !paidBy || selected.length === 0) return

    addExpense({
      description,
      amount: Number(amount),
      paidBy,
      participants: selected,
      splitType: "equal",
    })

    // Reset form
    setDescription("")
    setAmount("")
    setPaidBy("")
    setSelected([])
    setOpen(false)
  }

  const toggleParticipant = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelected(participants.map((p) => p.id))
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="flex items-center gap-2 px-4 py-2 border-2 border-[#dee1e6] rounded-lg hover:bg-gray-50">
        <Plus size={16} />
        Add Expense
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-[650px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl">

          <div className="px-6 py-5 border-b">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <PlusCircle className="text-blue-600" size={20} />
                  <h2 className="text-xl font-semibold">
                    Add New Expense
                  </h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the details to split costs with your group.
                </p>
              </div>

              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <FileText size={16} />
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Weekly Grocery Run"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  $ Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="$ 0.00"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Who Paid?
              </label>

              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select payer</option>
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Users size={16} />
                  With whom? (Select participants)
                </label>

                <button
                  onClick={selectAll}
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Select All
                </button>
              </div>

              <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="text-sm">{p.name}</span>

                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggleParticipant(p.id)}
                      className="h-4 w-4 accent-blue-600"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-xl">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Expense →
            </button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
