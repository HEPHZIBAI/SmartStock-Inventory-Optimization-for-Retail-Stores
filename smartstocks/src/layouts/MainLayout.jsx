import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatbotWidget from "../components/ChatbotWidget";

const MainLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Container */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar 
          setSidebarOpen={setSidebarOpen}
          onLogout={onLogout}   //  added here
        />

        {/* Page Content */}
        <main className="p-4 mt-4">
          <Outlet />
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default MainLayout;
