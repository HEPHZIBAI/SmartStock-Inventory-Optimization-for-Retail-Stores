import React from "react";

const Alerts = ({ inventory }) => {
  const lowStock = inventory.filter(item => item.quantity <= item.reorderLevel);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Low Stock Alerts</h2>

      {lowStock.length === 0 ? (
        <p className="text-gray-500">All items are sufficient 📦</p>
      ) : (
        <ul className="space-y-3">
          {lowStock.map(item => (
            <li key={item.id} className="p-3 border rounded bg-red-100">
              <b>{item.name}</b> is low — Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
