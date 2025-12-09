import Review from "../models/review.model.js";
import Trainer from "../models/trainer.model.js";
import { validateReview, getPaginationParams } from "../utils/validators.js";

/**
 * GET /api/reviews
 * Query params: page, limit, trainer, rating
 */
export const getReviews = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);
    const filter = {};

    if (req.query.trainer) {
      filter.trainer = req.query.trainer;
    }

    if (req.query.rating) {
      filter.rating = parseInt(req.query.rating);
    }

    const [items, total] = await Promise.all([
      Review.find(filter)
        .populate("trainer", "name profilePicture")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Review.countDocuments(filter)
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
 * GET /api/reviews/:id
 */
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate("trainer", "name profilePicture");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const validation = validateReview(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Verify trainer exists
    const trainer = await Trainer.findById(req.body.trainer);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const review = await Review.create(req.body);
    const populatedReview = await review.populate("trainer", "name profilePicture");

    // Update trainer rating
    const reviews = await Review.find({ trainer: req.body.trainer });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Trainer.findByIdAndUpdate(req.body.trainer, {
      rating: avgRating.toFixed(2),
      reviewsCount: reviews.length
    });

    res.status(201).json({
      message: "Review created successfully",
      data: populatedReview
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
 * PUT /api/reviews/:id
 */
export const updateReview = async (req, res, next) => {
  try {
    const validation = validateReview(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Don't allow changing trainer
    delete req.body.trainer;
    delete req.body.createdAt;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("trainer", "name profilePicture");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Recalculate trainer rating
    const reviews = await Review.find({ trainer: review.trainer._id });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Trainer.findByIdAndUpdate(review.trainer._id, {
      rating: avgRating.toFixed(2)
    });

    res.json({
      message: "Review updated successfully",
      data: review
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
 * DELETE /api/reviews/:id
 */
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Recalculate trainer rating
    const reviews = await Review.find({ trainer: review.trainer });
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Trainer.findByIdAndUpdate(review.trainer, {
        rating: avgRating.toFixed(2),
        reviewsCount: reviews.length
      });
    } else {
      await Trainer.findByIdAndUpdate(review.trainer, {
        rating: 0,
        reviewsCount: 0
      });
    }

    res.json({
      message: "Review deleted successfully",
      data: review
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/reviews/trainer/:trainerId
 * Get all reviews for a specific trainer
 */
export const getTrainerReviews = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);

    const [items, total] = await Promise.all([
      Review.find({ trainer: req.params.trainerId })
        .populate("trainer", "name profilePicture")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Review.countDocuments({ trainer: req.params.trainerId })
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
