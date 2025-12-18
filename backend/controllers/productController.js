const Product = require("../models/Product");

// SKU generator
function generateSKU(name) {
  const prefix = name.substring(0, 3).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${random}`;
}

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      sku: generateSKU(req.body.name)
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PRODUCTS (ADMIN → ALL | MANAGER → STORE ONLY)
exports.getProducts = async (req, res) => {
  try {
    const { role, storeId } = req.query;

    let query = {};
    if (role === "manager") {
      query.storeId = storeId;
    }

    const products = await Product.find(query);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
