import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Middleware to protect routes - requires valid JWT token
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Please login to access this resource"
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "trackify_secret_key_2025");

      // Get user from token
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          error: "Authentication failed",
          message: "User not found"
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          error: "Authentication failed",
          message: "Account is deactivated"
        });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid or expired token"
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict access to specific roles
 * Usage: restrictTo("admin", "trainer")
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required",
        message: "Please login to access this resource"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Authorization failed",
        message: "You do not have permission to perform this action"
      });
    }

    next();
  };
};

/**
 * Optional authentication - adds user to request if token exists, but doesn't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "trackify_secret_key_2025");
        const user = await User.findById(decoded.id).select("-password");
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token invalid, but that's ok for optional auth
        console.log("Optional auth: Invalid token");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
