// src/pages/Products.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

export default function Products() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
      setSuccessMsg("Product deleted");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Products</h1>

        <button onClick={() => navigate("/add-product")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          + Add Product
        </button>
      </div>

      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center shadow">
          {successMsg}
        </div>
      )}

      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          className="w-full pl-10 p-3 rounded-lg border bg-white dark:bg-gray-800 dark:text-white shadow"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="text-left bg-gray-200 dark:bg-gray-700">
              <th className="p-3">SKU</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => {
              const lowStock = p.quantity <= (p.reorderLevel ?? 5);
              const overStock = p.quantity >= (p.reorderLevel ?? 10) * 10;

              // row background adjustments for light theme (clearer)
              const rowLightBg = lowStock ? "bg-red-500" : overStock ? "bg-yellow-500" : "";

              return (
                <tr key={p._id} className={`border-b dark:border-gray-700 ${theme === "dark" ? (lowStock ? "bg-red-900/30" : overStock ? "bg-yellow-900/30" : "") : rowLightBg}`}>
                  <td className="p-3 font-medium">{p.sku}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category || "-"}</td>
                  <td className={`p-3 font-semibold ${lowStock ? "text-red-600" : ""}`}>{p.quantity}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3 flex items-center justify-center gap-3">
                    <button onClick={() => navigate(`/edit-product/${p._id}`)} className="text-blue-600 hover:text-blue-800"><FiEdit size={18} /></button>
                    <button onClick={() => deleteProduct(p._1d || p._id)} className="text-red-600 hover:text-red-800"><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 dark:text-gray-300">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
