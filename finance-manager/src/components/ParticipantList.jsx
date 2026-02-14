import * as Avatar from "@radix-ui/react-avatar"
import { useSplit } from "../context/SplitContext"

export default function ParticipantList() {
  const { participants } = useSplit()

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Participants</h2>

      {participants.length === 0 && (
        <p className="text-sm text-gray-500">No participants yet.</p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {participants.map((p) => (
          <div
            key={p.id}
            className="shadow-sm p-6 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition "
          >
            <div className="flex items-center gap-4">

              <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                <Avatar.Fallback className="text-blue-600 font-semibold">
                  {p.name.charAt(0)}
                </Avatar.Fallback>
              </Avatar.Root>

              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">
                  Paid: ₹{p.totalPaid} • Share: ₹{p.totalShare}
                </p>
              </div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                p.balance > 0
                  ? "bg-green-100 text-green-700"
                  : p.balance < 0
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              ₹{p.balance}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
