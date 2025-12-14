import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

export default function Products() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const CATEGORIES = ["Groceries", "Toys", "Electronics", "Furniture", "Clothing"];

  // ---------------- FETCH ----------------
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=${itemsPerPage}`);
      const data = Array.isArray(res.data.products) ? res.data.products : [];
      setProducts(data);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // ---------------- STOCK STATUS ----------------
  const getStockStatus = (p) => {
    const low = p.quantity <= (p.reorderLevel ?? 5);
    const over = p.quantity >= (p.reorderLevel ?? 10) * 10;
    if (low) return "low";
    if (over) return "over";
    return "normal";
  };

  // ---------------- FILTER + SORT ----------------
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.sku || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      data = data.filter((p) => p.category === categoryFilter);
    }

    if (stockFilter) {
      data = data.filter((p) => getStockStatus(p) === stockFilter);
    }

    if (sortBy === "name") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "price") data.sort((a, b) => a.price - b.price);
    if (sortBy === "quantity") data.sort((a, b) => a.quantity - b.quantity);

    return data;
  }, [products, search, categoryFilter, stockFilter, sortBy]);

  // ---------------- DELETE ----------------
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button onClick={() => navigate("/add-product")} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Product
        </button>
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input className="w-full pl-10 p-3 rounded-lg border" placeholder="Search name or SKU"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <select className="p-3 rounded-lg border text-black" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <select className="p-3 rounded-lg border text-black" value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
          <option value="">All Stock</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="over">Over</option>
        </select>

        <select className="p-3 rounded-lg border text-black" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">SKU</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => {
              const stock = getStockStatus(p);
              const rowBg =
                stock === "low" ? "bg-red-200 text-black" :
                stock === "over" ? "bg-yellow-200 text-black" : "";

              return (
                <tr key={p._id} className={`${rowBg} border-b`}>
                  <td className="p-3">{p.sku}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3 flex gap-3">
                    <button onClick={() => navigate(`/edit-product/${p._id}`)}><FiEdit /></button>
                    <button onClick={() => deleteProduct(p._id)}><FiTrash2 /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
