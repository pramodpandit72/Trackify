import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", 
    required: [true, "Job ID is required"]
  },
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
  },
  phone: {
    type: String,
    trim: true
  },
  resumeLink: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, "Message cannot exceed 1000 characters"]
  },
  appliedAt: { 
    type: Date, 
    default: Date.now,
    immutable: true
  }
});

// Index for faster queries
JobApplicationSchema.index({ jobId: 1, appliedAt: -1 });

export default mongoose.model("JobApplication", JobApplicationSchema);
