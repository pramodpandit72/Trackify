#!/usr/bin/env node

/**
 * Create Admin via API
 * Safe method to create additional admin accounts
 * Requires existing admin authentication token
 * 
 * Usage: node create-admin-api.js <token> <firstName> <lastName> <email> <password> [phone]
 * Example: node create-admin-api.js "your_admin_token" "John" "Doe" "john@admin.com" "SecurePass123" "1234567890"
 */

import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api";

async function createAdminViaAPI() {
  const args = process.argv.slice(2);

  if (args.length < 5) {
    console.log("❌ Missing required arguments");
    console.log("\nUsage: node create-admin-api.js <token> <firstName> <lastName> <email> <password> [phone]");
    console.log("\nExample:");
    console.log('node create-admin-api.js "eyJhbGciOiJIUzI1NiIs..." "John" "Doe" "john@admin.com" "SecurePass123" "1234567890"');
    console.log("\nRequirements:");
    console.log("- token: Valid JWT token from existing admin");
    console.log("- firstName: Admin first name");
    console.log("- lastName: Admin last name");
    console.log("- email: Admin email address");
    console.log("- password: Strong password (min 6 characters)");
    console.log("- phone: Optional, 10-digit phone number");
    process.exit(1);
  }

  const [token, firstName, lastName, email, password, phone = "0000000000"] = args;

  try {
    console.log("🔐 Authenticating with admin token...");
    
    const response = await axios.post(`${API_URL}/auth/create-admin`, {
      firstName,
      lastName,
      email,
      password,
      phone
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("\n✅ Admin account created successfully!\n");
    console.log("📋 New Admin Details:");
    console.log("─".repeat(50));
    console.log(`Name:  ${response.data.admin.firstName} ${response.data.admin.lastName}`);
    console.log(`Email: ${response.data.admin.email}`);
    console.log(`Role:  ${response.data.admin.role}`);
    console.log("─".repeat(50));
    console.log("\n💡 Tip: Share credentials securely with the new admin");
    console.log("⚠️  They should change password on first login\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error creating admin account");
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Error: ${error.response.data.error || error.response.data.message}`);
      
      if (error.response.data.errors) {
        console.error("\nValidation Errors:");
        error.response.data.errors.forEach(err => {
          console.error(`  - ${err.field}: ${err.message}`);
        });
      }
    } else {
      console.error(`Message: ${error.message}`);
    }

    process.exit(1);
  }
}

// Run the function
createAdminViaAPI();
