import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((s) => s.filter(x => x._id !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inventory & Products</h1>
        <button onClick={() => navigate("/add-product")} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Product</button>
      </div>

      <div className="mb-4">
        <input
          className="w-full p-3 rounded border bg-white dark:bg-gray-800"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="text-left">
              <th className="p-3">SKU</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Reorder</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const low = p.quantity <= (p.reorderLevel || 10);
              return (
                <tr key={p._id} className={`${low ? "bg-red-50 dark:bg-red-900/30" : ""}`}>
                  <td className="p-3 font-medium">{p.sku}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category || "-"}</td>
                  <td className={`p-3 ${low ? "text-red-600" : ""}`}>{p.quantity}</td>
                  <td className="p-3">{p.reorderLevel || 10}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">
                    <button onClick={() => navigate(`/edit-product/${p._id}`)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => deleteProduct(p._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan="7" className="p-6 text-center">No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
