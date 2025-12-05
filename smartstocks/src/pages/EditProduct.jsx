import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/product-form.css";

const EditProduct = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => alert("Failed to load product"));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/products/${id}`, product);
      if (res.data.success) {
        setMessage("Updated successfully!");
        setTimeout(() => navigate("/products"), 800);
      }
    } catch (err) {
      setMessage("Update failed");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="form-container">
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : ""}`}>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        {message && <div className="mb-3 bg-green-200 text-green-900 p-2 rounded">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded text-black" name="name" value={product.name} onChange={handleChange} />
          <input className="w-full p-2 border rounded text-black" name="quantity" type="number" value={product.quantity} onChange={handleChange} />
          <input className="w-full p-2 border rounded text-black" name="price" type="number" value={product.price} onChange={handleChange} />
          <input className="w-full p-2 border rounded text-black" name="category" value={product.category} onChange={handleChange} />

          <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditProduct;
