import express from "express";
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  getCategories,
  getMuscleGroups
} from "../controllers/exercise.controller.js";

const router = express.Router();

// Special routes (must come before /:id)
router.get("/categories/list", getCategories);     // GET /api/exercises/categories/list
router.get("/muscles/list", getMuscleGroups);      // GET /api/exercises/muscles/list

// Standard CRUD routes
router.get("/", getExercises);                      // GET /api/exercises
router.post("/", createExercise);                   // POST /api/exercises
router.get("/:id", getExerciseById);                // GET /api/exercises/:id
router.put("/:id", updateExercise);                 // PUT /api/exercises/:id
router.delete("/:id", deleteExercise);              // DELETE /api/exercises/:id

export default router;
