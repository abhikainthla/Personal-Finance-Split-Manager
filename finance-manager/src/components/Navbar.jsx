import { LayoutDashboard, History } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import AddExpenseModal from "./AddExpenseModal"

export default function Navbar() {
  return (
    <nav className="w-full bg-white  px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-10">


          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-blue-600">
              SplitWise
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">

            <button className="flex items-center gap-2 text-blue-600 font-medium">
              <LayoutDashboard size={16} />
              Dashboard
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <History size={16} />
              History
            </button>

          </div>
        </div>

        <div className="flex items-center gap-4">

          <AddExpenseModal/>


          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="w-9 h-9 rounded-full overflow-hidden border">
                <img
                  src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-white shadow-lg rounded-md p-2 w-40"
                sideOffset={5}
              >
                <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                <DropdownMenu.Item className="px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded cursor-pointer">
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

        </div>
      </div>
    </nav>
  )
}
