import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeId, setStoreId] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
        storeId
      });

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("storeId", res.data.storeId || "");

      onLogin();
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-sm">

        <h2 className="text-3xl mb-6 text-center font-semibold">
          SmartStock Login
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <select
          className="w-full mb-4 p-3 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="manager">Store Manager</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD WITH TOGGLE */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {role === "manager" && (
          <input
            type="text"
            placeholder="Store ID (CHEN-001)"
            className="w-full mb-4 p-3 border rounded"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            required
          />
        )}

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
