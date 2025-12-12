import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "read", "replied"],
    default: "pending"
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});

// Index for faster queries
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ status: 1 });

export default mongoose.model("ContactMessage", ContactMessageSchema);
