import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiShoppingCart, FiSettings, FiLogOut, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const baseLinkClass =
    "flex items-center px-5 py-3 text-[#3A6B4C]/80 hover:bg-[#A8E6CF]/40 hover:text-[#3A6B4C] transition-colors duration-200 rounded-xl";
  const activeLinkClass =
    "bg-[#3A6B4C] text-white font-semibold shadow-sm";

  return (
    <>
      {/* Overlay for Mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 text-2xl font-semibold text-[#3A6B4C] tracking-tight border-b border-gray-200">
          Admin WO
          <button onClick={() => setIsOpen(false)} className="md:hidden text-[#3A6B4C]/80 hover:text-[#3A6B4C]">
            <FiX size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-grow p-4 space-y-2">
          <NavLink
            to="/admin/katalog"
            onClick={handleLinkClick}
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ""}`}
          >
            <FiGrid className="mr-3 h-5 w-5" />
            Manajemen Katalog
          </NavLink>
          <NavLink
            to="/admin/orders"
            onClick={handleLinkClick}
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ""}`}
          >
            <FiShoppingCart className="mr-3 h-5 w-5" />
            Manajemen Order
          </NavLink>
          <NavLink
            to="/admin/settings"
            onClick={handleLinkClick}
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : ""}`}
          >
            <FiSettings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-50 text-red-600 py-2.5 rounded-xl hover:bg-red-100 transition-colors font-medium cursor-pointer"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;