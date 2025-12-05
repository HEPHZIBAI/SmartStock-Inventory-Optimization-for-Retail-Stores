import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Products = () => {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      alert("Product deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : ""}`}>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate("/add-product")}>
          + Add Product
        </button>
      </div>

      <table className="w-full bg-white dark:bg-gray-800 shadow rounded">
        <thead>
          <tr>
            <th className="p-3">SKU</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.sku}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.quantity}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">
                <button className="bg-green-600 text-white px-3 py-1 rounded mr-2" onClick={() => navigate(`/edit-product/${p._id}`)}>Edit</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Products;
