import React from "react";
import { NavLink } from "react-router-dom";

const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-3 rounded-lg mb-2 text-sm ${
        isActive ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-gray-700/30"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-900 text-white min-h-screen p-4 hidden md:block">
      <div className="mb-6 text-2xl font-bold">Inventory</div>

      <nav>
        <LinkItem to="/dashboard">Dashboard</LinkItem>
        <LinkItem to="/products">Products</LinkItem>
        <LinkItem to="/predictions">Predictions</LinkItem>
      </nav>
    </aside>
  );
}
