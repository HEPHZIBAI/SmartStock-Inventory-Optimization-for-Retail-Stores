import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiTag, FiHash, FiShoppingCart } from "react-icons/fi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  
  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Product name is required";
    if (!form.price) temp.price = "Price is required";
    if (!form.quantity) temp.quantity = "Quantity is required";
    if (!form.category.trim()) temp.category = "Category is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/products/add", form);

      if (res.data.success) {
        // Redirect with success message
        navigate("/products", { state: { showSuccess: true } });
      }

    } catch (err) {
      console.error(err);
      setErrors({ api: "❌ Failed to add product." });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <FiPackage /> Add New Product
      </h2>

      {errors.api && <p className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errors.api}</p>}

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label className="flex gap-2 mb-1 text-gray-700 dark:text-gray-300"><FiTag /> Product Name</label>
          <input
            className="w-full p-3 rounded border bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="flex gap-2 mb-1 text-gray-700 dark:text-gray-300"><FiHash /> Category</label>
          <input
            className="w-full p-3 rounded border bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="flex gap-2 mb-1 text-gray-700 dark:text-gray-300"><FiShoppingCart /> Quantity</label>
          <input
            type="number"
            className="w-full p-3 rounded border bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
            placeholder="0"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="flex gap-2 mb-1 text-gray-700 dark:text-gray-300"><FiTag /> Price (₹)</label>
          <input
            type="number"
            className="w-full p-3 rounded border bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="0"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
