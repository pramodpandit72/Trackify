import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Job title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"]
  },
  description: {
    type: String,
    minlength: [10, "Description must be at least 10 characters"]
  },
  location: { 
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance", "Remote"],
    default: "Full-time"
  },
  department: {
    type: String,
    trim: true
  },
  salary: { 
    type: String,
    trim: true
  },
  requirements: {
    type: [String],
    default: []
  },
  postedAt: { 
    type: Date, 
    default: Date.now,
    immutable: true
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update updatedAt before saving
JobSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Job", JobSchema);
