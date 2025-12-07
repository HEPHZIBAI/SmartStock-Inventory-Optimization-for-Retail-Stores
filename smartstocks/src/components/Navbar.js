import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="w-full bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="text-xl font-bold text-gray-800 dark:text-white"
            aria-label="app-title"
          >
            SmartStock
          </button>
          <nav className="hidden md:flex gap-3 text-sm">
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-200 hover:underline">Dashboard</Link>
            <Link to="/products" className="text-gray-600 dark:text-gray-200 hover:underline">Products</Link>
            <Link to="/predictions" className="text-gray-600 dark:text-gray-200 hover:underline">Predictions</Link>
            <Link to="/alerts" className="text-gray-600 dark:text-gray-200 hover:underline">Alerts</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded-md bg-white dark:bg-gray-700 text-sm"
            title="Toggle theme"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">Admin</div>
        </div>
      </div>
    </header>
  );
}
