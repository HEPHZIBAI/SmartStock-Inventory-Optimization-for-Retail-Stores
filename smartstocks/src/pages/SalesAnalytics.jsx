import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function SalesAnalytics() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales/category-summary")
      .then(res => {
        setData(res.data.map(d => ({
          category: d._id,
          revenue: d.revenue,
          quantity: d.quantity
        })));
      });
  }, []);

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <h1 className="text-3xl font-bold mb-6">Sales Analytics</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
