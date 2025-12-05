const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
