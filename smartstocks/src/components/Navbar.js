import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`w-full flex items-center justify-between px-6 py-4 shadow-md 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold">SmartStock</h1>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition 
        ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;