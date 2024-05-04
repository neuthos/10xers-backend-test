const express = require("express");
const CategoryController = require("../controllers/categories.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminGuard = require("../middlewares/adminGuard");

const router = express.Router();

router.get("/", CategoryController.listCategory);
router.post("/", authMiddleware, adminGuard, CategoryController.addCategory);
router.put(
  "/:uuid",
  authMiddleware,
  adminGuard,
  CategoryController.updateCategory
);
router.delete(
  "/:uuid",
  authMiddleware,
  adminGuard,
  CategoryController.deleteCategory
);

module.exports = router;
