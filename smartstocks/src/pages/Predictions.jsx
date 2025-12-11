// src/pages/Predictions.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const defaultData = [
  { date: "Mon", actual: 120, predicted: 110 },
  { date: "Tue", actual: 150, predicted: 140 },
  { date: "Wed", actual: 170, predicted: 160 },
  { date: "Thu", actual: 110, predicted: 130 },
  { date: "Fri", actual: 200, predicted: 190 }
];

export default function Predictions() {
  const { theme } = useContext(ThemeContext);
  const [productName, setProductName] = useState("");
  const [overview, setOverview] = useState(defaultData);
  const [prediction, setPrediction] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/predict")
      .then((res) => { if (res.data) setOverview(res.data); })
      .catch(() => setOverview(defaultData));
  }, []);

  const getPrediction = async () => {
    if (!productName.trim()) return alert("Enter product name");
    try {
      const res = await axios.post("http://localhost:5000/predict", { product: productName });
      if (Array.isArray(res.data.prediction)) setPrediction(res.data.prediction);
      else alert("Invalid prediction result");
    } catch (e) {
      alert("Prediction failed");
    }
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-4">Predictions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h2 className="font-semibold mb-3">Actual vs Predicted (overview)</h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={overview}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h2 className="font-semibold mb-3">Predict for a Product</h2>
          <input
            className="w-full p-3 rounded border mb-3 bg-white dark:bg-gray-700"
            placeholder="Product name (ex: Milk 1L)"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button onClick={getPrediction} className="bg-blue-600 text-white px-4 py-2 rounded">Get Prediction</button>

          {prediction.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Prediction (next days)</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <LineChart data={prediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="demand" stroke="#4ade80" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
