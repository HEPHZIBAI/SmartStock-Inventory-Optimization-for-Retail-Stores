import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StoreDashboard() {
  const storeId = localStorage.getItem("storeId");
  const role = localStorage.getItem("role");
  const { city } = useParams();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sales/city/${city}/stores`)
      .then(res => setStores(res.data));
  }, [city]);

  const getStockStatus = (inventory, sold) => {
    if (inventory < sold * 0.5) return "Understock 🔴";
    if (inventory > sold * 1.5) return "Overstock 🟡";
    return "Balanced 🟢";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5 text-gray-400">{city} Stores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stores.map(store => (
          <div key={store.StoreID} className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              {store.storeName || store.StoreID}
            </h2>
            <p>Units Sold: {store.totalUnitsSold}</p>
            <p>Inventory: {store.totalInventory}</p>
            <p className="font-semibold">
              {getStockStatus(store.totalInventory, store.totalUnitsSold)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}