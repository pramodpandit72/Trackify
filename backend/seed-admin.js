#!/usr/bin/env node

/**
 * Seed Admin Script
 * Creates the first admin user in the database
 * Safe & Optimized Approach
 * 
 * Usage: node seed-admin.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "trackify";
const MONGO_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/${DB_NAME}` : "mongodb://localhost:27017/trackify";

// Admin credentials - CHANGE THESE BEFORE RUNNING
const ADMIN_CREDENTIALS = {
  firstName: "Pramod",
  lastName: "Pandit",
  email: "pramod2pandit@gmail.com",
  password: "@123Prazapati",
  phone: "0000000000",
  role: "admin",
  isActive: true
};

async function seedAdmin() {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_CREDENTIALS.email });
    if (existingAdmin) {
      console.log("⚠️  Admin account already exists!");
      console.log(`Email: ${existingAdmin.email}`);
      console.log("❌ Aborted: Admin not created (to prevent duplicates)");
      process.exit(0);
    }

    // Check if ANY admin exists
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount > 0) {
      console.log(`⚠️  ${adminCount} admin account(s) already exist in the system`);
      console.log("If you need another admin, use the API endpoint:");
      console.log("POST /api/auth/create-admin (requires existing admin token)");
      process.exit(0);
    }

    // Create admin user
    console.log("📝 Creating admin account...");
    const admin = await User.create(ADMIN_CREDENTIALS);
    
    console.log("\n✅ Admin account created successfully!\n");
    console.log("📋 Admin Credentials:");
    console.log("─".repeat(50));
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: ${ADMIN_CREDENTIALS.password}`);
    console.log("─".repeat(50));
    console.log("\n⚠️  IMPORTANT SECURITY NOTES:");
    console.log("1. Change the password after first login");
    console.log("2. Keep these credentials secure");
    console.log("3. Don't commit credentials to version control");
    console.log("4. Use a strong password in production\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    if (error.code === 11000) {
      console.error("Duplicate key error - Admin with this email may already exist");
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seed function
seedAdmin();
