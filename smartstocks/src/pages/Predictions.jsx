import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Predictions = () => {
  const { theme } = useContext(ThemeContext);

  const [productName, setProductName] = useState("");
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPrediction = async () => {
    if (!productName.trim()) {
      alert("Enter a product name!");
      return;
    }

    setLoading(true);
    setPrediction([]);

    try {
      const res = await axios.post("http://localhost:5000/predict", {
        product: productName,
      });

      // Expected Format:
      // res.data.prediction = [
      //   { day: "Mon", demand: 20 },
      //   { day: "Tue", demand: 25 },
      // ]
      if (Array.isArray(res.data.prediction)) {
        setPrediction(res.data.prediction);
      } else {
        alert("Invalid prediction data received!");
      }

    } catch (error) {
      alert("Error fetching prediction");
      console.error("Prediction Error:", error);
    }

    setLoading(false);
  };

  return (
    <div
      className={`p-6 min-h-screen transition ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Sales Predictions</h1>

      <div
        className={`max-w-xl p-6 rounded-xl shadow-md transition ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Input */}
        <label className="font-semibold text-lg">Product Name</label>

        <input
          type="text"
          placeholder="Enter a product (Ex: Milk 1L)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`w-full mt-2 p-3 rounded-lg border outline-none transition ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-gray-200 text-gray-900 border-gray-300"
          }`}
        />

        {/* Button */}
        <button
          onClick={getPrediction}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Predicting..." : "Get Prediction"}
        </button>

        {/* Chart */}
        {prediction.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-900">
            <p className="font-semibold text-xl mb-4">📈 Predicted Demand</p>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#4ade80"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictions;
