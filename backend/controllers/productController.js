const Product = require("../models/Product");

// Auto SKU Generator
function generateSKU(name) {
  const prefix = name.substring(0, 3).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${random}`;
}

// ADD PRODUCT
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
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.inventoryStatus = async (req, res) => {
  const products = await Product.find();
  const sales = await Sale.aggregate([
    { $group: { _id: "$sku", avgSales: { $avg: "$unitsSold" } } }
  ]);

  const result = products.map(p => {
    const s = sales.find(x => x._id === p.sku);
    const avg = s ? s.avgSales : 0;

    let status = "Balanced";
    if (p.quantity < p.reorderLevel) status = "Understock";
    else if (p.quantity > avg * 30) status = "Overstock";

    return { ...p._doc, status };
  });

  res.json(result);
};
