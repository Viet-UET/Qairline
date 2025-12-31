import AdminLayout from "./layout/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import AdminFlights from "./pages/AdminFlights";
import AdminBookings from "./pages/AdminBookings";
import AdminAirplanes from "./pages/AdminAirplanes";
import AdminAccounts from "./pages/AdminAccounts";
import AdminServices from "./pages/AdminServices";
import AdminPromotions from "./pages/AdminPromotions";
import AdminSettings from "./pages/AdminSettings";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "flights", element: <AdminFlights /> },
    { path: "bookings", element: <AdminBookings /> },
    { path: "airplanes", element: <AdminAirplanes /> },
    { path: "accounts", element: <AdminAccounts /> },
    { path: "services", element: <AdminServices /> },
    { path: "promotions", element: <AdminPromotions /> },
    { path: "settings", element: <AdminSettings /> },
  ],
};

export default adminRoutes;
