import React from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ setSidebarOpen, onLogout }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow">
      
      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="text-xl"
      >
        ☰
      </button>

      <div className="flex items-center gap-4">

        {/* Theme Switch */}
        <button 
          onClick={toggleTheme}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}   // 🔥 this works now
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
