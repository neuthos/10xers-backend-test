const express = require("express");
const router = express.Router();
const {
  listOrders,
  createOrderController,
  updateOrderStatusController,
} = require("../controllers/orders.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminGuard = require("../middlewares/adminGuard");

router.get("/", authMiddleware, listOrders);
router.post("/", authMiddleware, createOrderController);

router.put(
  "/:orderId/status",
  authMiddleware,
  adminGuard,
  updateOrderStatusController
);

module.exports = router;
