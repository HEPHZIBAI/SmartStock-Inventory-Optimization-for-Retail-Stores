// src/pages/Alerts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiAlertTriangle, FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

export default function Alerts() {
  const [inventory, setInventory] = useState([]);
  const reorderDefault = 10;

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setInventory(res.data || []))
      .catch((err) => {
        console.error("Failed to load products for alerts", err);
        setInventory([]);
      });
  }, []);

  const processed = inventory.map((it) => ({
    ...it,
    quantity: Number(it.quantity ?? 0),
    reorder: Number(it.reorderLevel ?? reorderDefault),
  }));

  const understock = processed.filter((p) => p.quantity <= p.reorder);
  const overstock = processed.filter((p) => p.quantity > p.reorder * 2);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FiAlertTriangle className="text-2xl text-yellow-600 dark:text-yellow-400" />
        <h2 className="text-2xl font-semibold">Stock Alerts</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiArrowDownCircle className="text-xl text-red-600 dark:text-red-300" />
              <h3 className="font-medium">Understock</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{understock.length} items</div>
          </div>

          {understock.length === 0 ? (
            <div className="text-sm text-gray-600 dark:text-gray-300">No understock items. All good 📦</div>
          ) : (
            <ul className="space-y-3">
              {understock.map((item) => (
                <li key={item._id} className="p-3 rounded border border-red-100 dark:border-red-700 bg-red-50 dark:bg-red-900/30 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">SKU: {item.sku ?? "-"}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity} — Reorder: {item.reorder}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiArrowUpCircle className="text-xl text-green-600 dark:text-green-300" />
              <h3 className="font-medium">Overstock</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{overstock.length} items</div>
          </div>

          {overstock.length === 0 ? (
            <div className="text-sm text-gray-600 dark:text-gray-300">No overstock items.</div>
          ) : (
            <ul className="space-y-3">
              {overstock.map((item) => (
                <li key={item._id} className="p-3 rounded border border-green-100 dark:border-green-700 bg-green-50 dark:bg-green-900/20 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">SKU: {item.sku ?? "-"}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity} — Reorder: {item.reorder}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
