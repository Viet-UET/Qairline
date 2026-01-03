import UserLayout from "./layout/UserLayout";
import Home from "./pages/index";
import FlightResults from "./pages/FlightResults";
import AllFlights from "./pages/AllFlights";
import Profile from "./pages/Profile";
import BookingHistory from "./pages/BookingHistory";
import UserBookings from "./pages/UserBookings";
import News from "./pages/News";
import Promotions from "./pages/Promotions";
import Notifications from "./pages/Notifications";
import About from "./pages/About";

const userRoutes = {
  element: <UserLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/flights", element: <FlightResults /> },
    { path: "/all-flights", element: <AllFlights /> },
    { path: "/user/profile", element: <Profile /> },
    { path: "/user/booking-history", element: <BookingHistory /> },
    { path: "/userbooking", element: <UserBookings /> },
    { path: "/explore/news", element: <News /> },
    { path: "/explore/promotions", element: <Promotions /> },
    { path: "/explore/notifications", element: <Notifications /> },
    { path: "/explore/about", element: <About /> },
  ],
};

export default userRoutes;
