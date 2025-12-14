const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    reorderLevel: { type: Number, default: 10 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
