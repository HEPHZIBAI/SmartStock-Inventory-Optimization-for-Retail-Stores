const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

/* =========================
   CITY SUMMARY (ADMIN)
========================= */
router.get("/cities/summary", async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: "$city",
          totalUnitsSold: { $sum: "$Units Sold" },
          totalInventory: { $sum: "$Inventory Level" },
          stores: { $addToSet: "$Store ID" }
        }
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          totalUnitsSold: 1,
          totalInventory: 1,
          totalStores: { $size: "$stores" }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   STORES BY CITY (ADMIN)
========================= */
router.get("/city/:city/stores", async (req, res) => {
  try {
    const data = await Sale.aggregate([
      { $match: { city: req.params.city } },
      {
        $group: {
          _id: "$Store ID",
          storeName: { $first: "$storeName" },
          totalUnitsSold: { $sum: "$Units Sold" },
          totalInventory: { $sum: "$Inventory Level" }
        }
      },
      {
        $project: {
          _id: 0,
          storeId: "$_id",
          storeName: 1,
          totalUnitsSold: 1,
          totalInventory: 1
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   STOCK PREDICTION
   ADMIN → ALL STORES
   MANAGER → OWN STORE
========================= */
router.get("/predict/stock", async (req, res) => {
  try {
    const { role, storeId } = req.query;

    let matchStage = {};
    if (role === "manager" && storeId) {
      matchStage = { "Store ID": storeId };
    }

    const data = await Sale.aggregate([
      { $match: matchStage },
      {
        $project: {
          city: 1,
          storeName: 1,
          sku: 1,
          inventory: "$Inventory Level",
          forecast: "$Demand Forecast",
          stockStatus: {
            $cond: [
              { $lt: ["$Inventory Level", { $multiply: ["$Demand Forecast", 0.7] }] },
              "Understock",
              {
                $cond: [
                  { $gt: ["$Inventory Level", { $multiply: ["$Demand Forecast", 1.5] }] },
                  "Overstock",
                  "Balanced"
                ]
              }
            ]
          }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   STORE DASHBOARD DATA
========================= */
router.get("/store/:storeId", async (req, res) => {
  try {
    const data = await Sale.find({ "Store ID": req.params.storeId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   SALES (FILTERED)
========================= */
router.get("/sales", async (req, res) => {
  try {
    const { storeId } = req.query;
    const filter = storeId ? { "Store ID": storeId } : {};
    const data = await Sale.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
