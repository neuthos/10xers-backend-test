const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {errorHandler} = require("../utils/responseHandler");

const findByEmail = async (email) => {
  const user = await User.findOne({where: {email}});
  return user;
};

const generateAccessToken = (data) => {
  const token = jwt.sign(
    JSON.stringify(data),
    process.env.ACCESS_TOKEN_SECRET,
    {}
  );
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

const login = async (res, email, password) => {
  const user = await findByEmail(email);
  if (!user) throw new Error("You are not registered yet");
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return errorHandler(res, "Invalid email or password", 401);
  }
  return user;
};

const register = async (email, password, role = "CUSTOMERS") => {
  const user = await findByEmail(email);
  if (user) throw new Error("You are already register");
  const newUser = User.create({email, password, role});
  return newUser;
};

module.exports = {login, register, generateAccessToken, verifyAccessToken};
