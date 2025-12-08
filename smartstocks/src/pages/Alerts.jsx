import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const Alerts = ({ inventory = [] }) => {
  // Ensure inventory is always an array
  const lowStock = inventory.filter(
    (item) => item.quantity <= item.reorderLevel
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FiAlertCircle /> Low Stock Alerts
      </h2>

      {lowStock.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          All items are sufficient 📦
        </p>
      ) : (
        <ul className="space-y-3">
          {lowStock.map((item) => (
            <li
              key={item.id}
              className="p-3 border rounded bg-red-100 dark:bg-red-800 dark:text-red-100 flex justify-between items-center"
            >
              <span>
                <b>{item.name}</b> — Quantity: {item.quantity}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
