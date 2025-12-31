import Login from './pages/Login/Login';
import Register from './pages/Register';

const authRoutes = {
  children: [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ],
};

export default authRoutes;
