const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const ApiError = require("../utils/ApiError");
const catchAsync = require('../utils/catchAsync');

const authenticate = catchAsync(async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization header required.');
  }
  const tokenn = token.substring("Bearer ".length);
  try {
    const decoded = jwt.verify(tokenn, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token.");
  }
});

const adminauthenticate = catchAsync(async (req, res, next) => {

  if (req.user.role !== "admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied. Admin only.');
  }
  next();
});

module.exports = { authenticate, adminauthenticate };