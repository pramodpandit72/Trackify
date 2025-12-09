import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  trainer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Trainer", 
    required: [true, "Trainer ID is required"]
  },
  userName: { 
    type: String, 
    required: [true, "User name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"]
  },
  rating: { 
    type: Number, 
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"]
  },
  comment: {
    type: String,
    trim: true,
    minlength: [5, "Comment must be at least 5 characters"]
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    immutable: true
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update updatedAt before saving
ReviewSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
ReviewSchema.index({ trainer: 1, createdAt: -1 });

export default mongoose.model("Review", ReviewSchema);
