const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const ApiError = require("../utils/ApiError");

const authenticate = (req, next) => {
  const token = req.header('Authorization');

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization token is required.');
  }
  const tokenn = token.substring("Bearer ".length);
  const decoded = jwt.verify(tokenn, JWT_SECRET);
  req.user = decoded.user;
  next();

};

const authorizedUser = (req, next) => {
  const { id } = req.params;
  const token = req.header('Authorization');

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization token is required.');
  }
  try {
    const tokenn = token.substring("Bearer ".length);
    const decoded = jwt.verify(tokenn, JWT_SECRET);
    const userId = decoded.user;
    if (userId._id !== id) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.');
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token.');
  }
};

module.exports = { authenticate, authorizedUser };