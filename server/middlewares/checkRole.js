// Verify Role
export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return next({
          statusCode: 401,
          message: "No user data found in request",
        });
      }

      const userRole = req.user.role;

      // Check if role allowed
      if (!allowedRoles.includes(userRole)) {
        return next({
          statusCode: 403,
          message: `Access denied. '${userRole}' is not allowed to access this route.`,
        });
      }
      next();
      
    } catch (error) {
      next(error);
    }
  };
};
