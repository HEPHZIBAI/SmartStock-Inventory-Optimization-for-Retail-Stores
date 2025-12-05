import React, { useState } from "react";
import axios from "axios";
import "../styles/product-form.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/products/add", {
        name,
        price,
        quantity,
        category,
      });

      if (res.data.success) {
        setSuccess("Product added successfully!");
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("");
      }
    } catch (err) {
      setError("Error adding product");
    }
  };

  return (
    <div className="product-form-wrapper">
      <div className="product-form-card">
        <h2>Add Product</h2>

        {success && <div className="success-box">{success}</div>}
        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="form-btn" onClick={handleSubmit}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
