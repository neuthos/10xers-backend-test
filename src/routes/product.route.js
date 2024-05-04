const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductById,
  listProducts,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controller");

const authMiddleware = require("../middlewares/authMiddleware");
const adminGuard = require("../middlewares/adminGuard");

router.get("/:productId", getProductById);
router.get("/", listProducts);

router.post("/", authMiddleware, adminGuard, createProduct);
router.put("/:productId", authMiddleware, adminGuard, updateProductById);
router.delete("/:productId", authMiddleware, adminGuard, deleteProductById);

module.exports = router;
