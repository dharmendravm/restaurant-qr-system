// 404 Handler
export const notFound = (req, res, next) => {
    next({
        statusCode : 404,
        message : `Route Not Found`
    });
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;


// Construct payload
const payload = {
    success : false,
    message : err.message || 'Something went wrong'
};

if (process.env.NODE_ENV !== "production") {
  payload.stack = err.stack;
  payload.path = req.originalUrl;
  payload.method = req.method;
    };
// Log error
  console.error(
    `Error: ${err.message} | ${req.method} ${req.originalUrl} | Status: ${statusCode}`
  );

  // Send response
  res.status(statusCode).json(payload);
};