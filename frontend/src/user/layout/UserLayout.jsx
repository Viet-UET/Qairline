import { Outlet } from 'react-router-dom';
import Header from '../../shared/components/layout/Header';

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
