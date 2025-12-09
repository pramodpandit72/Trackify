import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";
import { validateJob, validateJobApplication, getPaginationParams } from "../utils/validators.js";

/**
 * GET /api/jobs
 * Query params: page, limit, search, isActive
 */
export const listJobs = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);
    const filter = {};

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { location: searchRegex }
      ];
    }

    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    } else {
      filter.isActive = true; // Default to active jobs
    }

    const [items, total] = await Promise.all([
      Job.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ postedAt: -1 }),
      Job.countDocuments(filter)
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
 * GET /api/jobs/:id
 */
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/jobs
 */
export const createJob = async (req, res, next) => {
  try {
    const validation = validateJob(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    const job = await Job.create(req.body);
    res.status(201).json({
      message: "Job created successfully",
      data: job
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
 * PUT /api/jobs/:id
 */
export const updateJob = async (req, res, next) => {
  try {
    delete req.body.postedAt;

    const validation = validateJob(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      message: "Job updated successfully",
      data: job
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
 * DELETE /api/jobs/:id
 */
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Delete associated applications
    await JobApplication.deleteMany({ jobId: req.params.id });

    res.json({
      message: "Job deleted successfully",
      data: job
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/jobs/:jobId/apply
 */
export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const validation = validateJobApplication({ ...req.body, jobId });

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors
      });
    }

    // Verify job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = await JobApplication.create({
      jobId,
      ...req.body
    });

    res.status(201).json({
      message: "Job application submitted successfully",
      data: application
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
 * GET /api/jobs/:jobId/applications
 */
export const getJobApplications = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);
    const { jobId } = req.params;

    const [items, total] = await Promise.all([
      JobApplication.find({ jobId })
        .populate("jobId", "title")
        .skip(skip)
        .limit(limit)
        .sort({ appliedAt: -1 }),
      JobApplication.countDocuments({ jobId })
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
 * GET /api/jobs/applications/all
 * Get all applications (admin)
 */
export const getAllApplications = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPaginationParams(req.query);

    const [items, total] = await Promise.all([
      JobApplication.find()
        .populate("jobId", "title")
        .skip(skip)
        .limit(limit)
        .sort({ appliedAt: -1 }),
      JobApplication.countDocuments()
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
 * GET /api/jobs/applications/:appId
 */
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.appId).populate("jobId");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/jobs/applications/:appId
 */
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.appId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({
      message: "Application deleted successfully",
      data: application
    });
  } catch (err) {
    next(err);
  }
};
