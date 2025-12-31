import { useState } from "react";
import { ChevronDown, User, LogOut, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../shared/assets/logo.svg";

export default function AdminHeader() {
  const [openMenu, setOpenMenu] = useState(false);

  // Hardcode admin user for demo
  const adminUser = {
    name: "Admin",
    role: "Admin",
  };

  return (
    <header className="w-full h-[64px] bg-white border-b border-[#E5E7EB] flex justify-center">
      <div className="w-full max-w-[1300px] px-6 flex items-center justify-between">
        {/* LEFT: LOGO + TITLE */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="QAirline"
            className="h-[32px] object-contain"
          />
          <span className="h-6 w-px bg-gray-300" />
          <h1 className="text-lg font-semibold text-qa-green">
            Admin Dashboard
          </h1>
        </div>

        {/* RIGHT: PROFILE */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex items-center gap-3 bg-[#F8F7F9] border border-[#D9D9D9] rounded-full px-3 py-1.5 hover:bg-white transition"
          >
            {/* AVATAR */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-qa-green text-white flex items-center justify-center font-semibold text-sm">
                {adminUser.name.charAt(0)}
              </div>

              {/* ADMIN ICON */}
              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                <Crown size={12} className="text-white" />
              </div>
            </div>

            {/* INFO */}
            <div className="text-left leading-tight">
              <p className="text-sm font-semibold text-gray-800">
                {adminUser.name}
              </p>
              <p className="text-xs text-yellow-600 font-medium">
                {adminUser.role}
              </p>
            </div>

            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {/* DROPDOWN */}
          {openMenu && (
            <div className="absolute right-0 mt-2 w-[220px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b bg-[#F8F7F9]">
                <p className="font-semibold text-gray-800">
                  {adminUser.name}
                </p>
                <p className="text-xs text-yellow-600 flex items-center gap-1">
                  <Crown size={12} />
                  Quản trị viên
                </p>
              </div>

              <div className="flex flex-col text-sm">
                <Link
                  to="/admin/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <User size={16} />
                  Thông tin cá nhân
                </Link>

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    // frontend demo only
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
