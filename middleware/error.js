import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let {statusCode, message} = err;
  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  console.error(err);
  res.locals.errorMessage = err.message;

  const response = {
    error: {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
    }
  };

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).send(response);
};