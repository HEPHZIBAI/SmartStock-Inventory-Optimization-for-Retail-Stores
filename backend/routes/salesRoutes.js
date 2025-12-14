const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// ALL sales
router.get("/", async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

// CATEGORY WISE SALES
router.get("/category-summary", async (req, res) => {
  const summary = await Sale.aggregate([
    {
      $group: {
        _id: "$Category",
        revenue: { $sum: "$Revenue" },
        quantity: { $sum: "$Quantity" }
      }
    }
  ]);
  res.json(summary);
});

module.exports = router;
