const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);    // ✅ FIXED → now returns ONE product
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
