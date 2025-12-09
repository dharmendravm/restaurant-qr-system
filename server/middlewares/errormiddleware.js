// 404 Handler
export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Something went wrong";

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Response Payload
  const payload = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
    payload.path = req.originalUrl;
    payload.method = req.method;
  }
  // Log error
  console.error(
    `Error: ${err.message} | ${req.method} ${req.originalUrl} | Status: ${statusCode}`
  );
  res.status(statusCode).json(payload);
};
