import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Sales", path: "/sales" },
    { name: "Predictions", path: "/predictions" },
  ];

  return (
    <div
      className={`h-screen w-56 flex flex-col p-5 space-y-4 
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-3 py-2 rounded-lg font-medium 
          ${location.pathname === link.path
            ? theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-blue-500 text-white"
            : "hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;