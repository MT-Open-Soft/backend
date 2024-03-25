const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const adminauthenticate = async (req, res, next) => {
  let token = req.header('Authorization');
  token = token.substring("Bearer ".length);
  const decoded = jwt.verify(token, JWT_SECRET);

  const userId = decoded.user;
  const role = userId.role;

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found.');
  }

  if (role !== "admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Admin page access denied.');
  }
  next();
};

module.exports = adminauthenticate;