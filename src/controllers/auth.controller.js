const {errorHandler, successHandler} = require("../utils/responseHandler");
const authService = require("../services/auth.service");

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email) errorHandler("Email is required");
    if (!password) errorHandler("Password is required");
    const user = await authService.login(res, email, password);
    const accessToken = authService.generateAccessToken(user);

    return successHandler(res, "Login success", {
      accessToken,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    await authService.register(email, password);
    return successHandler(res, "Register success");
  } catch (err) {
    next(err);
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    await authService.register(email, password, "EMPLOYEE");
    return successHandler(res, "Register success");
  } catch (err) {
    next(err);
  }
};

module.exports = {login, register, registerAdmin};
