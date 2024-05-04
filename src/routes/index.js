const express = require("express");
const router = express.Router();
const AuthRouter = require("./auth.route");
const CategoriesRouter = require("./category.route");
const ProductsRouter = require("./product.route");
const OrderRouter = require("./order.route");

/**
 * AUTH ROUTER
 */
router.use("/auth", AuthRouter);

/**
 * CATEGORIES ROUTER
 */
router.use("/categories", CategoriesRouter);

/**
 * PRODUCTS ROUTER
 */
router.use("/products", ProductsRouter);

/**
 * Order Router
 */

router.use("/orders", OrderRouter);

module.exports = router;
