import Exercise from "../models/exercise.model.js";
import { validateExercise, getPaginationParams, buildExerciseFilter } from "../utils/validators.js";

/**
 * GET /api/exercises
 * Query params: page, limit, search, category, difficulty, muscleGroup
 */
export const getExercises = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);
    const filter = buildExerciseFilter(req.query);

    const [items, total] = await Promise.all([
      Exercise.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Exercise.countDocuments(filter)
    ]);

    res.json({
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/exercises/:id
 */
export const getExerciseById = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/exercises
 */
export const createExercise = async (req, res, next) => {
  try {
    const validation = validateExercise(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    const exercise = await Exercise.create(req.body);
    res.status(201).json({
      message: "Exercise created successfully",
      data: exercise
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }
    next(err);
  }
};

/**
 * PUT /api/exercises/:id
 */
export const updateExercise = async (req, res, next) => {
  try {
    // Don't allow updating createdAt
    delete req.body.createdAt;

    const validation = validateExercise(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json({
      message: "Exercise updated successfully",
      data: exercise
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }
    next(err);
  }
};

/**
 * DELETE /api/exercises/:id
 */
export const deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json({
      message: "Exercise deleted successfully",
      data: exercise
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/exercises/categories/list
 * Get all unique categories
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Exercise.distinct("category");
    res.json({
      categories: categories.sort()
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/exercises/muscles/list
 * Get all unique muscle groups
 */
export const getMuscleGroups = async (req, res, next) => {
  try {
    const muscleGroups = await Exercise.distinct("muscleGroups");
    res.json({
      muscleGroups: muscleGroups.sort()
    });
  } catch (err) {
    next(err);
  }
};
