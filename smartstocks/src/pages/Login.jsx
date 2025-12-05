// Login.jsx
import React from "react";

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add real authentication logic here
    onLogin(); // Set isLoggedIn to true
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form 
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full mb-4 p-2 border rounded"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full mb-4 p-2 border rounded"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;