import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);

  // ===== MOCK DATA (replace with API data later) =====
  const kpis = {
    totalProducts: 312,
    lowStock: 18,
    stockValue: 542300, // INR
  };

  const weeklySales = [
    { day: "Mon", sales: 4200 },
    { day: "Tue", sales: 5300 },
    { day: "Wed", sales: 6100 },
    { day: "Thu", sales: 4800 },
    { day: "Fri", sales: 7700 },
    { day: "Sat", sales: 9000 },
    { day: "Sun", sales: 6500 },
  ];

  const categoryStock = [
    { category: "Electronics", stock: 120 },
    { category: "Clothing", stock: 80 },
    { category: "Grocery", stock: 190 },
    { category: "Accessories", stock: 60 },
  ];

  const topProducts = [
    { id: "P001", name: "Wireless Headphones", sold: 480, stock: 12 },
    { id: "P012", name: "Organic Milk 1L", sold: 350, stock: 60 },
    { id: "P023", name: "Running Shoes", sold: 290, stock: 25 },
    { id: "P034", name: "Smartphone X", sold: 210, stock: 6 },
    { id: "P045", name: "Backpack Urban", sold: 180, stock: 18 },
  ];

  // Derived values
  const totalWeeklySales = useMemo(
    () => weeklySales.reduce((s, d) => s + d.sales, 0),
    [weeklySales]
  );

  // Colors tailored for light/dark
  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const panelBorder = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`min-h-screen p-6 transition-colors ${bg}`}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm opacity-70 mt-1">Overview of inventory, sales and alerts</p>
          </div>

          <div className="flex gap-3 items-center">
            <div className={`px-3 py-2 rounded ${cardBg} shadow-sm ${panelBorder}`}>
              <div className="text-xs text-gray-500">This Week</div>
              <div className="text-lg font-semibold">{totalWeeklySales.toLocaleString()}</div>
            </div>

            <div className={`px-3 py-2 rounded ${cardBg} shadow-sm ${panelBorder}`}>
              <div className="text-xs text-gray-500">Last update</div>
              <div className="text-sm font-medium">Today</div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className={`${cardBg} rounded-xl p-5 shadow ${panelBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Total Products</div>
                <div className="text-2xl font-bold mt-2">{kpis.totalProducts}</div>
              </div>
              <div className="text-3xl opacity-80">📦</div>
            </div>
            <div className="mt-3 text-sm text-gray-500">All tracked SKUs across stores</div>
          </div>

          <div className={`${cardBg} rounded-xl p-5 shadow ${panelBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Low Stock</div>
                <div className="text-2xl font-bold mt-2 text-red-500">{kpis.lowStock}</div>
              </div>
              <div className="text-3xl opacity-80">⚠️</div>
            </div>
            <div className="mt-3 text-sm text-gray-500">Items with stock below threshold</div>
          </div>

          <div className={`${cardBg} rounded-xl p-5 shadow ${panelBorder}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Inventory Value</div>
                <div className="text-2xl font-bold mt-2">₹ {kpis.stockValue.toLocaleString()}</div>
              </div>
              <div className="text-3xl opacity-80">💰</div>
            </div>
            <div className="mt-3 text-sm text-gray-500">Estimated stock value (₹)</div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Line Chart */}
          <div className={`${cardBg} rounded-xl p-5 shadow ${panelBorder}`}>
            <h3 className="text-lg font-semibold mb-3">Weekly Sales</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={weeklySales} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke={theme === "dark" ? "#2a2a2a" : "#f1f1f1"} strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke={theme === "dark" ? "#cbd5e1" : "#6b7280"} />
                  <YAxis stroke={theme === "dark" ? "#cbd5e1" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{ background: theme === "dark" ? "#111827" : "#fff" }}
                    itemStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stock by Category Bar Chart */}
          <div className={`${cardBg} rounded-xl p-5 shadow ${panelBorder}`}>
            <h3 className="text-lg font-semibold mb-3">Stock by Category</h3>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={categoryStock} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke={theme === "dark" ? "#2a2a2a" : "#f1f1f1"} strokeDasharray="3 3" />
                  <XAxis dataKey="category" stroke={theme === "dark" ? "#cbd5e1" : "#6b7280"} />
                  <YAxis stroke={theme === "dark" ? "#cbd5e1" : "#6b7280"} />
                  <Tooltip
                    contentStyle={{ background: theme === "dark" ? "#111827" : "#fff" }}
                    itemStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
                  />
                  <Bar dataKey="stock" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top products table */}
        <div className={`${cardBg} rounded-xl p-5 shadow ${panelBorder}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Units Sold</th>
                  <th className="p-3">Stock</th>
                </tr>
              </thead>

              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.id} className={`${panelBorder} border-t`}>
                    <td className="p-3">{p.id}</td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 text-indigo-600 font-semibold">{p.sold}</td>
                    <td className={`p-3 ${p.stock <= 10 ? "text-red-500" : ""}`}>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
