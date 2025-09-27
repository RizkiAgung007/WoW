import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiShoppingCart, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const baseLinkClass =
    "flex items-center px-5 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition rounded-xl";
  const activeLinkClass =
    "bg-indigo-100 text-indigo-700 font-semibold shadow-sm";

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-6 text-2xl font-bold text-indigo-600 tracking-tight border-b">
        Admin WO
      </div>

      {/* Nav */}
      <nav className="flex-grow p-4 space-y-2">
        <NavLink
          to="/admin/katalog"
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ""}`}
        >
          <FiGrid className="mr-3 h-5 w-5" />
          Manajemen Katalog
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ""}`}
        >
          <FiShoppingCart className="mr-3 h-5 w-5" />
          Manajemen Order
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ""}`}
        >
          <FiSettings className="mr-3 h-5 w-5" />
          Settings
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-red-50 text-red-600 py-2.5 rounded-xl hover:bg-red-100 transition"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
