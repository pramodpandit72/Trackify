import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Trainer email is required"],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
  name: { 
    type: String, 
    required: [true, "Trainer name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"]
  },
  title: { 
    type: String,
    trim: true
  },
  bio: { 
    type: String,
    trim: true,
    maxlength: [500, "Bio cannot exceed 500 characters"]
  },
  specialties: [{ 
    type: String,
    trim: true
  }],
  rating: { 
    type: Number, 
    default: 0,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot exceed 5"]
  },
  reviewsCount: { 
    type: Number, 
    default: 0,
    min: [0, "Reviews count cannot be negative"]
  },
  experienceYears: { 
    type: Number,
    min: [0, "Experience years cannot be negative"]
  },
  profilePicture: { 
    type: String,
    trim: true
  },
  pricePerSession: { 
    type: Number,
    min: [0, "Price cannot be negative"]
  },
  location: { 
    type: String,
    trim: true
  },
  tags: [{ 
    type: String,
    trim: true
  }],
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
TrainerSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster searches
TrainerSchema.index({ name: "text" });
TrainerSchema.index({ rating: -1 });
TrainerSchema.index({ location: 1 });

export default mongoose.model("Trainer", TrainerSchema);
