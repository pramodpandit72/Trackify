import express from "express";
import {
  listJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  getJobApplications,
  getAllApplications,
  getApplicationById,
  deleteApplication
} from "../controllers/job.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Special routes (before /:id)
router.get("/applications/all", protect, restrictTo("admin"), getAllApplications);  // Admin only
router.delete("/applications/:appId", protect, restrictTo("admin"), deleteApplication); // Admin only
router.get("/applications/:appId", protect, getApplicationById);       // GET /api/jobs/applications/:appId
router.get("/:jobId/applications", protect, restrictTo("admin"), getJobApplications); // Admin only
router.post("/:jobId/apply", applyJob);                                // POST /api/jobs/:jobId/apply (public - anyone can apply)

// Standard CRUD routes (after special routes)
router.get("/", listJobs);                                             // GET /api/jobs (public)
router.post("/", protect, restrictTo("admin"), createJob);             // POST /api/jobs (admin only)
router.get("/:id", getJobById);                                        // GET /api/jobs/:id (public)
router.put("/:id", protect, restrictTo("admin"), updateJob);           // PUT /api/jobs/:id (admin only)
router.delete("/:id", protect, restrictTo("admin"), deleteJob);        // DELETE /api/jobs/:id (admin only)

export default router;
