import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import SalesAnalytics from "./pages/SalesAnalytics";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Predictions from "./pages/Predictions";
import Alerts from "./pages/Alerts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>

          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          } />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {isLoggedIn && (
            <Route path="/" element={<MainLayout onLogout={handleLogout} />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="predictions" element={<Predictions />} />
              <Route path="alerts" element={<Alerts />} />
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/sales" element={<SalesAnalytics />} />
            </Route>
          )}

          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
