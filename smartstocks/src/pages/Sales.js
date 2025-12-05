import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch sales data
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sales");
      setSales(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load sales records");
      setLoading(false);
    }
  };

  // Delete sale entry
  const deleteSale = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sale record?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`);
      setSales(sales.filter((sale) => sale._id !== id));
    } catch (err) {
      alert("Failed to delete sale record");
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Search filter
  const filteredSales = sales.filter((s) =>
    s.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Records</h1>

        <button
          onClick={() => navigate("/add-sale")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Sale
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading sales records...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredSales.length === 0 ? (
        <p>No sales records found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Product</th>
                <th className="border p-3 text-left">Quantity</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((s) => (
                <tr key={s._id}>
                  <td className="border p-3">{s.productName}</td>
                  <td className="border p-3">{s.quantity}</td>
                  <td className="border p-3">₹{s.totalPrice}</td>
                  <td className="border p-3">{new Date(s.date).toLocaleDateString()}</td>
                  <td className="border p-3 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/edit-sale/${s._id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSale(s._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Sales;
