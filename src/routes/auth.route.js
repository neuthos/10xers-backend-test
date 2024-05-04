const express = require("express");
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminGuard = require("../middlewares/adminGuard");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post(
  "/register-admin",
  authMiddleware,
  adminGuard,
  AuthController.registerAdmin
);

module.exports = router;
