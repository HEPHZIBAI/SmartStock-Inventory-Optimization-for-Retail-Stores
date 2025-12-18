import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");
  const storeId = localStorage.getItem("storeId");
  const storeName = localStorage.getItem("storeName");

  const CATEGORIES = ["Groceries", "Toys", "Electronics", "Furniture", "Clothing"];

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all",{
      params: {
        role,
        storeId
      }
    })
    .then(res => setProducts(res.data.products || []));
  }, [role,storeId]);

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.quantity <= (p.reorderLevel ?? 10)).length;
  const overstock = products.filter(p => p.quantity >= 100).length;

  const categoryStock = CATEGORIES.map(cat => {
    const items = products.filter(p => p.category === cat);
    return {
      category: cat,
      totalQty: items.reduce((s, p) => s + p.quantity, 0),
      low: items.filter(p => p.quantity <= (p.reorderLevel ?? 10)).length,
      over: items.filter(p => p.quantity >= 100).length
    };
  });

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <h1 className="text-3xl font-bold mb-6">
        {role === "admin" ? "Admin Dashboard" : `Store Dashboard (${storeName})`}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div>Total Products</div>
          <div className="text-2xl font-bold">{totalProducts}</div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div>Low Stock</div>
          <div className="text-2xl font-bold text-red-600">{lowStock}</div>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div>Overstock</div>
          <div className="text-2xl font-bold text-yellow-500">{overstock}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryStock}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalQty" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}