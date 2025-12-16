const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

/* ===============================
   CITY DASHBOARD SUMMARY
================================ */
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

/* ===============================
   STORE DASHBOARD (CITY → STORES)
================================ */
router.get("/city/:city/stores", async (req, res) => {
  try {
    const city = req.params.city;

    const data = await Sale.aggregate([
      { $match: { city } },
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
          StoreID: "$_id",
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

module.exports = router;
