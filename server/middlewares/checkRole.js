import {logAuth} from '../customLogs/logs.js'

// Verify Role
export const checkRole = (role) => {
  return (req, res, next) => {
    logAuth("This is the console of chek role", req.user);
    if (role.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        error: "ACCESS_DENIDE",
        message: `Oops! '${req.user.role}' can't access this route`,
      });
    }
  };
};
