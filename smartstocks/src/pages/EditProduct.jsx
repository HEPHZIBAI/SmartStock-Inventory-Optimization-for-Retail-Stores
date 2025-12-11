import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const EditProduct = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // ----------------------------
  // Load product by ID
  // ----------------------------
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {
        setErrors({ general: "Failed to load product" });
      });
  }, [id]);


  // ----------------------------
  // Handle input change
  // ----------------------------
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  // ----------------------------
  // Validate fields
  // ----------------------------
  const validate = () => {
    let temp = {};
    if (!product.name) temp.name = "Product name is required";
    if (!product.price || product.price <= 0)
      temp.price = "Price must be greater than 0";
    if (!product.quantity || product.quantity < 0)
      temp.quantity = "Quantity must be 0 or above";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };


  // ----------------------------
  // Submit update
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product
      );

      if (res.data.success) {
        setSuccessMsg("Product updated successfully!");

        setTimeout(() => {
          navigate("/products", { state: { msg: "updated" } });
        }, 1500);
      }
    } catch (err) {
      setErrors({ general: "Failed to update product" });
    }
  };


  if (!product) return <p className="p-6">Loading...</p>;


  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-5">Edit Product ✏️</h2>

        {/* GENERAL ERROR */}
        {errors.general && (
          <p className="mb-3 text-red-500">{errors.general}</p>
        )}

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <p className="mb-3 text-green-600 font-medium bg-green-100 p-2 rounded">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <input
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* QUANTITY */}
          <div>
            <input
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>

          {/* PRICE */}
          <div>
            <input
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
              name="price"
              type="number"
              placeholder="Price ₹"
              value={product.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <input
              className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
              name="category"
              placeholder="Category (optional)"
              value={product.category}
              onChange={handleChange}
            />
          </div>

          {/* BUTTONS */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
