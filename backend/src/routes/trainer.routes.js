import express from "express";
import {
  listTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getSpecialties
} from "../controllers/trainer.controller.js";

const router = express.Router();

// Special routes (before /:id)
router.get("/search/specialties", getSpecialties);     // GET /api/trainers/search/specialties

// Standard CRUD routes
router.get("/", listTrainers);                          // GET /api/trainers
router.post("/", createTrainer);                        // POST /api/trainers
router.get("/:id", getTrainer);                         // GET /api/trainers/:id
router.put("/:id", updateTrainer);                      // PUT /api/trainers/:id
router.delete("/:id", deleteTrainer);                   // DELETE /api/trainers/:id

export default router;
