const {errorHandler} = require("../utils/responseHandler");

const adminGuard = (req, res, next) => {
  const role = req.user?.role;
  if (role === "EMPLOYEE") {
    next();
  } else {
    errorHandler(res, "You are not authorized to access this route", 403);
  }
};

module.exports = adminGuard;
