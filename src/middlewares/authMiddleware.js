const {verifyAccessToken} = require("../services/auth.service");
const {errorHandler} = require("../utils/responseHandler");
const authMiddleware = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return errorHandler(res, "Access token not provided", 401);
  }

  try {
    const decodedToken = verifyAccessToken(accessToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return errorHandler(res, "Invalid access token", 401);
  }
};

module.exports = authMiddleware;
