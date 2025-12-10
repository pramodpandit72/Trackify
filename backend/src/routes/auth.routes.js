import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  createAdmin
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes (require authentication)
router.get("/me", protect, getMe);
router.put("/update-profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// Admin-only routes
router.post("/create-admin", protect, createAdmin);

export default router;
