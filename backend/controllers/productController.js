const Product = require("../models/Product");

// Auto SKU Generator
function generateSKU(name) {
  const prefix = name.substring(0, 3).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${random}`;
}

// Add product
exports.addProduct = async (req, res) => {
  try {
    const { name, quantity, price, category } = req.body;

    const product = new Product({
      name,
      quantity,
      price,
      category,
      sku: generateSKU(name),
    });

    await product.save();
    res.json({ success: true, message: "Product Added", product });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// ⭐ Get product by ID (needed for Edit page)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Product Updated", product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
