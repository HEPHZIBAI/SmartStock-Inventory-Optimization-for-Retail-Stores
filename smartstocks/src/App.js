// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Sales from "./pages/Sales";
import Predictions from "./pages/Predictions";
import Login from "./pages/Login";
import ChatbotWidget from "./components/ChatbotWidget";


function App() {
  // Simple auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
          
          {/* Only show Sidebar if logged in */}
          {isLoggedIn && <Sidebar />}

          {/* Main Content */}
          <div className="flex-1">
            {isLoggedIn && <Navbar />}

            <div className="p-6">
              <Routes>
                {/* Default route */}
                <Route 
                  path="/" 
                  element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
                />

                {/* Protected Routes */}
                {isLoggedIn ? (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/predictions" element={<Predictions />} />
                  </>
                ) : (
                  // Redirect any other routes to login if not logged in
                  <Route path="*" element={<Navigate to="/" />} />
                )}
                
                {/* Optional explicit login route */}
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
              </Routes>
            </div>
          </div>
          <ChatbotWidget /> 
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
