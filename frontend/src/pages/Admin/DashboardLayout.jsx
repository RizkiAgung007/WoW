import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-grow md:ml-64 transition-all duration-300">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm p-4 border-b border-gray-200 flex items-center justify-between md:hidden">
          <h1 className="text-xl font-semibold text-[#3A6B4C]">
            Admin Panel
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#3A6B4C]"
            aria-label="Buka menu"
          >
            <FiMenu size={24} />
          </button>
        </header>

        <div className="p-6 md:p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-6rem)]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;