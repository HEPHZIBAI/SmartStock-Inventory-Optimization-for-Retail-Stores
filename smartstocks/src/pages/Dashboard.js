import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const p = await axios.get("http://localhost:5000/api/products");
      setProducts(p.data || []);
    } catch (e) {
      console.error(e);
    }

    try {
      const r = await axios.get("http://localhost:5000/api/predict"); // optional endpoint
      setPredictionData(r.data || []);
    } catch (e) {
      // ignore if not available
      setPredictionData([
        { date: "Mon", actual: 120, predicted: 110 },
        { date: "Tue", actual: 150, predicted: 140 },
        { date: "Wed", actual: 170, predicted: 160 },
        { date: "Thu", actual: 110, predicted: 130 },
        { date: "Fri", actual: 200, predicted: 190 }
      ]);
    }
  };

  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.quantity <= (p.reorderLevel || 10)).length;
  const overstock = products.filter((p) => p.quantity > 100).length;

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold">{totalProducts}</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <div className="text-sm text-gray-500">Low Stock</div>
          <div className="text-2xl font-bold text-red-600">{lowStock}</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
          <div className="text-sm text-gray-500">Overstock</div>
          <div className="text-2xl font-bold text-yellow-600">{overstock}</div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow">
        <h2 className="font-semibold mb-3">Actual vs Predicted Sales</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="predicted" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
