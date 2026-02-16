import { LayoutDashboard, History } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { NavLink, useNavigate } from "react-router-dom"
import AddExpenseModal from "./AddExpenseModal"

export default function Navbar() {
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition ${
      isActive
        ? "text-blue-600 font-medium"
        : "text-gray-600 hover:text-gray-900"
    }`

  return (
    <nav className="w-full bg-white px-8 py-3 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-10">

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-blue-600">
              SplitWise
            </span>
          </div>


          <div className="flex items-center gap-6 text-sm">

            <NavLink to="/" className={navLinkClass}>
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>

            <NavLink to="/history" className={navLinkClass}>
              <History size={16} />
              History
            </NavLink>

          </div>
        </div>

        <div className="flex items-center gap-4">

          <AddExpenseModal />

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
                <DropdownMenu.Item
                  onClick={() => navigate("/profile")}
                  className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                >
                  Profile
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onClick={() => navigate("/settings")}
                  className="px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                >
                  Settings
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                <DropdownMenu.Item
                  className="px-3 py-2 text-sm text-red-500 hover:bg-gray-100 rounded cursor-pointer"
                >
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
