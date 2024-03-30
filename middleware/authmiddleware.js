import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import ApiError from "../utils/ApiError.js";
import catchAsync from '../utils/catchAsync.js';

import { JWT_SECRET } from '../utils/config.js';

export const authenticate = catchAsync(async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization header required.');
  }
  token = token.substring("Bearer ".length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token.");
  }
});

export const adminauthenticate = catchAsync(async (req, res, next) => {

  if (req.user.role !== "admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied. Admin only.');
  }
  next();
});
