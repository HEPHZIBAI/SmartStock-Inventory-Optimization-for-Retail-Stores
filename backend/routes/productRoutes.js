const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET products with pagination
router.get("/", async (req, res) => {
  try {
    // Get page and limit from query, default: page 1, 10 items per page
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Total number of products
    const total = await Product.countDocuments();

    // Find products for this page
    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit), // total number of pages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET all products without pagination (for dashboard)
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});


module.exports = router;

