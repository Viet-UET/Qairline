import { Routes, Route, Navigate } from "react-router-dom";

/* ================= LAYOUT ================= */
import Header from "./components/layout/Header";

/* ================= AUTH ================= */
import Login from "./pages/Auth/Login/Login";

/* ================= BOOKING FLOW ================= */
import FlightResults from "./pages/bookings/FlightResults";
import FlightSelect from "./pages/bookings/FlightSelect";
import PassengerInfo from "./pages/bookings/PassengerInfo";
import SeatSelected from "./pages/bookings/SeatSelected";

/* ================= USER ================= */
// Vé của tôi (booking đang có thể thao tác)
import UserBookings from "./pages/bookings/UserBookings";

// Lịch sử đặt vé (đã bay / hoàn tất)
import BookingHistory from "./pages/User/BookingHistory";

// Hồ sơ cá nhân
import Profile from "./pages/User/Profile";

/* ================= ERROR ================= */
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home";

/* ================= EXPLORE ================= */
import News from "./pages/Explore/News";
import Promotions from "./pages/Explore/Promotions";
import About from "./pages/Explore/About";
import Notifications from "./pages/Explore/Notifications";

export default function App() {
  return (
    <>
      {/* HEADER luôn hiển thị */}
      <Header />

      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= DEMO FLOW ================= */}
        {/* Login xong → cho vào thẳng tìm vé */}
        <Route path="/" element={<Home />} />

        {/* ================= BOOKING FLOW ================= */}
        <Route path="/flights" element={<FlightResults />} />
        <Route path="/flights/select" element={<FlightSelect />} />
        <Route path="/passenger-info" element={<PassengerInfo />} />
        <Route path="/seat-selected" element={<SeatSelected />} />

        {/* ================= USER ================= */}
        {/* Vé của tôi */}
        <Route path="/userbooking" element={<UserBookings />} />

        {/* Lịch sử đặt vé */}
        <Route
          path="/user/booking-history"
          element={<BookingHistory />}
        />

        {/* Hồ sơ cá nhân */}
        <Route path="/user/profile" element={<Profile />} />

        {/* ================= EXPLORE ================= */}
        <Route path="/explore/news" element={<News />} />
        <Route path="/explore/promotions" element={<Promotions />} />
        <Route path="/explore/about" element={<About />} />
        <Route path="/explore/notifications" element={<Notifications />} />

        {/* ================= ERROR ================= */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}
