import AppError from '../utils/appError.js'
// 404 Handler
export const notFound = (req, _res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Global Error Handler
export const globalErrorHandler = (err, req, res, _next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};
