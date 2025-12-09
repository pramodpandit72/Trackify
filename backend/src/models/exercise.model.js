import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Exercise name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"]
  },
  category: { 
    type: String, 
    enum: ["Chest", "Legs", "Back", "Shoulders", "Arms", "Core"],
    required: [true, "Category is required"]
  },
  muscleGroups: {
    type: [String],
    required: [true, "At least one muscle group is required"],
    validate: {
      validator: (v) => v.length > 0,
      message: "Must specify at least one muscle group"
    }
  },
  difficulty: { 
    type: String, 
    enum: {
      values: ["Beginner", "Intermediate", "Advanced"],
      message: "{VALUE} is not a valid difficulty"
    },
    default: "Beginner" 
  },
  equipment: String,
  description: {
    type: String,
    minlength: [10, "Description must be at least 10 characters"]
  },
  instructions: String,
  targetArea: String,
  variants: [String],
  image: String,
  videoUrl: String,
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
ExerciseSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster searches
ExerciseSchema.index({ name: "text", description: "text", category: 1, difficulty: 1 });

export default mongoose.model("Exercise", ExerciseSchema);
