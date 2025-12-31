import { Link } from "react-router-dom";
import {
  Search,
  Ticket,
  Sparkles,
  ChevronDown,
  Newspaper,
  Gift,
  Bell,
  Info,
  User,
  History,
  LogOut,
  Crown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.svg";

export default function Header() {
  const [openExplore, setOpenExplore] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const userRole = "Khách"; // Hardcoded role: "Khách" or "Admin"

  const exploreRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setOpenExplore(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-[72px] bg-white border-b border-[#E5E7EB] flex justify-center">
      <div className="w-full max-w-[1300px] px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="QAirline" className="h-[34px]" />
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-8 text-sm relative">
          <Link
            to="/flights"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9D9D9] hover:bg-[#F8F7F9] text-qa-green"
          >
            <Search size={16} />
            Tìm chuyến bay
          </Link>

          <Link
            to="/userbooking"
            className="flex items-center gap-2 text-gray-600 hover:text-qa-green"
          >
            <Ticket size={16} />
            Vé của bạn
          </Link>

          {/* KHÁM PHÁ */}
          <div className="relative" ref={exploreRef}>
            <button
              onClick={() => setOpenExplore(!openExplore)}
              className="flex items-center gap-2 text-gray-600 hover:text-qa-green"
            >
              <Sparkles size={16} />
              Khám phá
              <ChevronDown size={14} />
            </button>

            {openExplore && (
              <div className="absolute top-full mt-3 w-[280px] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-50">
                <ExploreItem
                  icon={<Newspaper />}
                  title="Tin tức"
                  desc="Cập nhật tin tức mới nhất về ngành hàng không"
                  to="/explore/news"
                />
                <ExploreItem
                  icon={<Gift />}
                  title="Khuyến mãi"
                  desc="Các ưu đãi và khuyến mãi hấp dẫn"
                  to="/explore/promotions"
                />
                <ExploreItem
                  icon={<Bell />}
                  title="Thông báo"
                  desc="Thông báo quan trọng từ QAirline"
                  to="/explore/notifications"
                />
                <ExploreItem
                  icon={<Info />}
                  title="Về chúng tôi"
                  desc="Tìm hiểu thêm về QAirline"
                  to="/explore/about"
                />
              </div>
            )}
          </div>
        </nav>

        {/* USER PROFILE (HARDCODED) */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <div className="w-9 h-9 rounded-full bg-qa-green text-white flex items-center justify-center font-bold text-base">
              L
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">Long Ha</p>
              <div className="flex items-center gap-1">
                {userRole === "Admin" && (
                  <Crown size={12} className="text-yellow-500" />
                )}
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {openProfile && (
            <div className="absolute top-full mt-3 right-0 w-[240px] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-50">
              <ProfileItem
                icon={<User size={18} />}
                title="Hồ sơ cá nhân"
                to="/user/profile"
              />
              <ProfileItem
                icon={<History size={18} />}
                title="Lịch sử đặt vé"
                to="/user/booking-history"
              />
              <div className="border-t border-gray-100 my-1"></div>
              <ProfileItem
                icon={<LogOut size={18} />}
                title="Đăng xuất"
                to="/login" // UI only, navigates to login
                isAction={true}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function ProfileItem({ icon, title, to, isAction }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
        isAction
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {title}
    </Link>
  );
}

function ExploreItem({ icon, title, desc, to }) {
  return (
    <Link
      to={to}
      className="flex gap-4 px-5 py-4 hover:bg-[#F8F7F9] transition"
    >
      <div className="w-10 h-10 rounded-xl bg-green-50 text-qa-green flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </Link>
  );
}
