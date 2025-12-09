import Trainer from "../models/trainer.model.js";
import Review from "../models/review.model.js";
import { validateTrainer, getPaginationParams } from "../utils/validators.js";

/**
 * GET /api/trainers
 * Query: ?page=1&limit=12&search=keyword&specialty=yoga&minRating=4
 */
export const listTrainers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(100, parseInt(req.query.limit) || 12);
    const skip = (page - 1) * limit;

    const filter = {};
    
    if (req.query.search) {
      const q = req.query.search;
      filter.$or = [
        { name: new RegExp(q, "i") },
        { title: new RegExp(q, "i") },
        { bio: new RegExp(q, "i") },
        { specialties: new RegExp(q, "i") }
      ];
    }
    
    if (req.query.specialty) {
      filter.specialties = req.query.specialty;
    }
    
    if (req.query.minRating) {
      filter.rating = { $gte: parseFloat(req.query.minRating) };
    }
    
    if (req.query.minPrice || req.query.maxPrice) {
      filter.pricePerSession = {};
      if (req.query.minPrice) filter.pricePerSession.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.pricePerSession.$lte = parseFloat(req.query.maxPrice);
    }

    const [items, total] = await Promise.all([
      Trainer.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Trainer.countDocuments(filter)
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
 * GET /api/trainers/:id
 */
export const getTrainer = async (req, res, next) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    const reviews = await Review.find({ trainer: trainer._id }).sort({ createdAt: -1 });

    res.json({ trainer, reviews });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/trainers
 */
export const createTrainer = async (req, res, next) => {
  try {
    const validation = validateTrainer(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    const trainer = await Trainer.create(req.body);
    res.status(201).json({
      message: "Trainer created successfully",
      data: trainer
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
 * PUT /api/trainers/:id
 */
export const updateTrainer = async (req, res, next) => {
  try {
    // Don't allow updating rating and reviewsCount directly
    delete req.body.rating;
    delete req.body.reviewsCount;
    delete req.body.createdAt;

    const validation = validateTrainer(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    
    res.json({
      message: "Trainer updated successfully",
      data: trainer
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
 * DELETE /api/trainers/:id
 */
export const deleteTrainer = async (req, res, next) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    
    // Delete associated reviews
    await Review.deleteMany({ trainer: req.params.id });
    
    res.json({ 
      message: "Trainer deleted successfully",
      data: trainer 
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/trainers/search/specialties
 * Get all unique specialties
 */
export const getSpecialties = async (req, res, next) => {
  try {
    const specialties = await Trainer.distinct("specialties");
    res.json({
      specialties: specialties.filter(Boolean).sort()
    });
  } catch (err) {
    next(err);
  }
};
