import UserLayout from './layout/UserLayout';
import Home from './pages/index'; // Assuming index.jsx is the Home page
import FlightResults from './pages/FlightResults';
import Profile from './pages/Profile';

const userRoutes = {
  element: <UserLayout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/flights', element: <FlightResults /> },
    { path: '/user/profile', element: <Profile /> },
  ],
};

export default userRoutes;
