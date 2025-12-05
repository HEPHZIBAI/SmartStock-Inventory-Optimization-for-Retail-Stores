import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Inventory = () => {
  const { theme } = useContext(ThemeContext);

  // Temporary sample data (replace with API later)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Example static data
    const sampleData = [
      { id: 1, name: "Laptop", category: "Electronics", quantity: 10, price: 60000 },
      { id: 2, name: "Phone", category: "Electronics", quantity: 25, price: 20000 },
      { id: 3, name: "Shoes", category: "Fashion", quantity: 40, price: 1500 },
      { id: 4, name: "Bag", category: "Accessories", quantity: 15, price: 799 },
    ];

    setProducts(sampleData);
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>

        <Link
          to="/add-product"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div
        className={`rounded-xl overflow-hidden shadow-lg transition ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table className="w-full text-left">
          <thead
            className={`text-sm ${
              theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
            }`}
          >
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price (₹)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={`border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">₹{product.price}</td>

                <td className="p-3 flex gap-3 justify-center">
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
