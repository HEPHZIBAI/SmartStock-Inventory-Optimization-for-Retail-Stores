const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    Date: String,
    sku: String,
    Category: String,
    city: String,

    // ⬇️ FIELD NAMES WITH SPACES
    "Store ID": String,
    storeName: String,

    "Inventory Level": Number,
    "Units Sold": Number,
    "Units Ordered": Number,
    "Demand Forecast": Number,

    Price: Number,
    Discount: Number,
    Seasonality: String,
  },
  { collection: "sales" }
);

module.exports = mongoose.model("Sale", saleSchema);
