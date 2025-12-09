import express from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getTrainerReviews
} from "../controllers/review.controller.js";

const router = express.Router();

// Special routes (before /:id)
router.get("/trainer/:trainerId", getTrainerReviews); // GET /api/reviews/trainer/:trainerId

// Standard CRUD routes
router.get("/", getReviews);                           // GET /api/reviews
router.post("/", createReview);                        // POST /api/reviews
router.get("/:id", getReviewById);                     // GET /api/reviews/:id
router.put("/:id", updateReview);                      // PUT /api/reviews/:id
router.delete("/:id", deleteReview);                   // DELETE /api/reviews/:id

export default router;
