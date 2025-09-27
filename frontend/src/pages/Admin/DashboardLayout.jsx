import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-grow p-6 md:p-10 ml-64">
        <div className="bg-white rounded-3xl shadow-lg p-6 min-h-[calc(100vh-4rem)] border border-gray-100">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
