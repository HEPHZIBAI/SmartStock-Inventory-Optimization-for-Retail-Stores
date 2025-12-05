const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/add", addProduct);
router.get("/", getProducts);
router.get("/:id", getProducts);   // Needed for Edit page
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
