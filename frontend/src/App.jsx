import { useRoutes } from 'react-router-dom';
import adminRoutes from './admin/routes';
import userRoutes from './user/routes';
import authRoutes from './auth/routes';

export default function App() {
  const routes = useRoutes([adminRoutes, userRoutes, authRoutes]);
  return routes;
}





