const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  Date: String,
  Store: String,
  Product: String,
  SKU: String,
  Category: String,
  Price: Number,
  Quantity: Number,
  Revenue: Number
});

module.exports = mongoose.model("Sale", saleSchema);
