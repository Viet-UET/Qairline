import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Plane,
  Ticket,
  Users,
  Settings,
  Gift,
  Wrench,
} from "lucide-react";
import AdminHeader from "../components/AdminHeader";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/posts", label: "Posts", icon: FileText },
  { to: "/admin/flights", label: "Flights", icon: Plane },
  { to: "/admin/bookings", label: "Bookings", icon: Ticket },
  { to: "/admin/airplanes", label: "Airplanes", icon: Plane },
  { to: "/admin/accounts", label: "Accounts", icon: Users },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/promotions", label: "Promotions", icon: Gift },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8F7F9]">
      {/* ===== TOP HEADER (ADMIN HEADER) ===== */}
      <AdminHeader />

      <div className="flex">
        {/* ===== SIDEBAR ===== */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-[#E5E7EB] bg-white min-h-[calc(100vh-64px)]">
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cx(
                      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition",
                      isActive
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 px-6 py-6 max-w-[1300px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
