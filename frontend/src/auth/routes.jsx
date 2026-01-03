import Login from './pages/Login/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import VerifyEmail from './pages/ForgotPassword/VerifyEmail';
import ResetPassword from './pages/ForgotPassword/ResetPassword';

const authRoutes = {
  children: [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/verify-email', element: <VerifyEmail /> },
    { path: '/reset-password', element: <ResetPassword /> },
  ],
};

export default authRoutes;
