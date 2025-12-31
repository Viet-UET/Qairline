import { useState } from "react";
import logo from "../../assets/logo.svg";
import { logoutUser } from "../../api/auth";

export default function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await logoutUser(token); // gọi API backend /api/auth/logout
      }
    } catch (err) {
      console.warn("Logout API error, vẫn tiến hành xoá token local:", err);
    }

    localStorage.removeItem("token");
    alert("Đăng xuất thành công!");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-white font-afacad">

      {/* SIDEBAR */}
      <aside
        className={`bg-white border-r border-gray-200 p-6 h-screen transition-all duration-300 
        ${openSidebar ? "w-64" : "w-20"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <img
            src={logo}
            alt="logo"
            className={`transition-all ${openSidebar ? "w-[180px]" : "w-[60px]"}`}
          />
        </div>

        {/* MENU */}
        <nav className="space-y-4">
          {["Dashboard", "Locations", "Aircraft", "Flights", "News", "Bookings"].map(
            (item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#E8F5E9] text-qa-green transition text-lg"
              >
                {openSidebar ? item : item[0]}
              </button>
            )
          )}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className="absolute bottom-6 left-6 text-qa-green"
        >
          {openSidebar ? "←" : "→"}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="flex justify-between items-center bg-white h-[80px] px-10 shadow">
          <h1 className="text-2xl font-audiowide text-qa-green">QAirline Admin</h1>

          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold text-gray-700">
              Hi, qairlines_backend
            </span>

            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-lg"
            >
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-10">
          <h2 className="text-3xl font-audiowide text-qa-green mb-4">
            Dashboard – Test Logout
          </h2>

          <p className="text-gray-700 text-xl">
            Đây là Dashboard demo. Bạn có thể test sidebar, header, logout.
          </p>
        </div>
      </main>
    </div>
  );
}
