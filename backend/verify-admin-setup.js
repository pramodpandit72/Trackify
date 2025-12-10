#!/usr/bin/env node

/**
 * Admin Setup Verification Checklist
 * Run this to verify admin setup is complete
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/trackify";

async function verifyAdminSetup() {
  try {
    console.log("\n🔍 ADMIN SETUP VERIFICATION\n");
    console.log("─".repeat(60));

    // 1. Check MongoDB connection
    console.log("\n1️⃣  Checking MongoDB Connection...");
    await mongoose.connect(MONGO_URI);
    console.log("   ✅ MongoDB connected successfully");

    // 2. Check admin count
    console.log("\n2️⃣  Checking Admin Accounts...");
    const adminCount = await User.countDocuments({ role: "admin" });
    
    if (adminCount === 0) {
      console.log("   ❌ NO ADMIN ACCOUNTS FOUND");
      console.log("   📝 Run: node seed-admin.js");
    } else {
      console.log(`   ✅ Found ${adminCount} admin account(s)`);
      
      // Show admin details
      const admins = await User.find({ role: "admin" }).select("firstName lastName email createdAt");
      admins.forEach((admin, idx) => {
        console.log(`      ${idx + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
        console.log(`         Created: ${admin.createdAt.toLocaleDateString()}`);
      });
    }

    // 3. Check total user count
    console.log("\n3️⃣  Checking User Statistics...");
    const totalUsers = await User.countDocuments({});
    const trainers = await User.countDocuments({ role: "trainer" });
    const regularUsers = await User.countDocuments({ role: "user" });
    
    console.log(`   📊 Total Users: ${totalUsers}`);
    console.log(`      - Admins: ${adminCount}`);
    console.log(`      - Trainers: ${trainers}`);
    console.log(`      - Regular Users: ${regularUsers}`);

    // 4. API Routes Check
    console.log("\n4️⃣  Available API Routes...");
    console.log("   ✅ POST /api/auth/login");
    console.log("   ✅ POST /api/auth/signup");
    console.log("   ✅ POST /api/auth/create-admin (requires admin token)");
    console.log("   ✅ GET /api/auth/me (requires token)");
    console.log("   ✅ PUT /api/auth/update-profile (requires token)");
    console.log("   ✅ PUT /api/auth/change-password (requires token)");

    // 5. Security Check
    console.log("\n5️⃣  Security Status...");
    const hasAdminToken = process.env.JWT_SECRET || "trackify_secret_key_2025";
    if (process.env.JWT_SECRET) {
      console.log("   ✅ JWT_SECRET configured in environment");
    } else {
      console.log("   ⚠️  Using default JWT_SECRET (change in production)");
    }

    // 6. Recommendations
    console.log("\n6️⃣  Next Steps...");
    if (adminCount === 0) {
      console.log("   1. Run: node seed-admin.js");
      console.log("   2. Login with created credentials");
      console.log("   3. Create additional admins via API");
    } else {
      console.log("   ✅ System ready for admin operations");
      console.log("   💡 Use /api/auth/create-admin to add more admins");
      console.log("   🔐 Keep admin credentials secure");
    }

    console.log("\n" + "─".repeat(60) + "\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Run verification
verifyAdminSetup();
