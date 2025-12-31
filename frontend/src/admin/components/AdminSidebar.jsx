import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../shared/assets/logo.svg';

const menuItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Posts', path: '/admin/posts' },
  { name: 'Flights', path: '/admin/flights' },
  { name: 'Bookings', path: '/admin/bookings' },
  { name: 'Airplanes', path: '/admin/airplanes' },
  { name: 'Accounts', path: '/admin/accounts' },
  { name: 'Services', path: '/admin/services' },
  { name: 'Promotions', path: '/admin/promotions' },
  { name: 'Settings', path: '/admin/settings' },
];

export default function AdminSidebar() {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <aside
      className={`bg-white border-r border-gray-200 p-6 h-screen transition-all duration-300 
      ${openSidebar ? 'w-64' : 'w-20'}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <img
          src={logo}
          alt="logo"
          className={`transition-all ${openSidebar ? 'w-[180px]' : 'w-[60px]'}`}
        />
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}   // QUAN TRỌNG
            className={({ isActive }) =>
              `
              block px-4 py-3 rounded-xl text-lg transition
              ${
                isActive
                  ? 'bg-[#E8F5E9] text-qa-green font-semibold'
                  : 'text-gray-700 hover:bg-[#E8F5E9]'
              }
              `
            }
          >
            {openSidebar ? item.name : item.name[0]}
          </NavLink>
        ))}
      </nav>

      {/* Toggle */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="absolute bottom-6 left-6 text-qa-green"
      >
        {openSidebar ? '←' : '→'}
      </button>
    </aside>
  );
}
