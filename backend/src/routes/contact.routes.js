import express from "express";
import { sendContactMessage, getContactMessages, updateMessageStatus } from "../controllers/contact.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/contact - Send contact form message (public)
router.post("/", sendContactMessage);

// GET /api/contact/messages - Get all messages (admin only)
router.get("/messages", protect, restrictTo("admin"), getContactMessages);

// PATCH /api/contact/messages/:id - Update message status (admin only)
router.patch("/messages/:id", protect, restrictTo("admin"), updateMessageStatus);

export default router;
