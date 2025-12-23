// Verify Role
export const checkRole = (allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user || !req.user.role) {
      const err = new Error("Unauthorized");
      err.statusCode = 401;
      return next(err);
    }

    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
      const err = new Error("Server error: roles not configured");
      err.statusCode = 500;
      return next(err);
    }
    const userRole = req.user.role;

    // Check if role allowed
    if (!allowedRoles.includes(userRole)) {
      const err = new Error(
        `Access denied. '${userRole}' is not allowed to access this route.`
      );
      err.statusCode = 403;
      return next(err);
    }
    next();
  };
};
