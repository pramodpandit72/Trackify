import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

// Generate JWT token
const generateToken = (userId, role = 'user') => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "trackify_secret_key_2025", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
};

/**
 * POST /api/auth/signup
 * Register a new user
 */
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, role, age, height, weight, goals, mainGoal, fitnessLevel } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "required", message: "First name, last name, email, and password are required" }
        ]
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "password", message: "Password must be at least 6 characters" }
        ]
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "email", message: "Email already registered" }
        ]
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      role: role || "user",
      age,
      height,
      weight,
      goals,
      mainGoal,
      fitnessLevel
    });

    // Generate token
    const token = generateToken(user._id);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({ error: "Validation failed", errors });
    }
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Login user or admin
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "required", message: "Email and password are required" }
        ]
      });
    }

    // First, check if it's an admin
    let admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");
    
    if (admin) {
      // Admin login
      if (!admin.isActive) {
        return res.status(401).json({
          error: "Authentication failed",
          message: "Account is deactivated. Please contact support."
        });
      }

      const isPasswordValid = await admin.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Authentication failed",
          message: "Invalid email or password"
        });
      }

      const token = generateToken(admin._id, 'admin');
      admin.lastLogin = new Date();
      await admin.save();

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          role: 'admin',
          phone: admin.phone,
          profilePicture: admin.profilePicture,
          permissions: admin.permissions,
          isSuperAdmin: admin.isSuperAdmin
        }
      });
    }

    // If not admin, check regular user
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    console.log('User found:', !!user);

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password"
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Account is deactivated. Please contact support."
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = generateToken(user._id, 'user');

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Get current user profile
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goals: user.goals,
        mainGoal: user.mainGoal,
        fitnessLevel: user.fitnessLevel,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/update-profile
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, age, height, weight, goals, mainGoal, fitnessLevel, profilePicture } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (age) user.age = age;
    if (height) user.height = height;
    if (weight) user.weight = weight;
    if (goals) user.goals = goals;
    if (mainGoal) user.mainGoal = mainGoal;
    if (fitnessLevel) user.fitnessLevel = fitnessLevel;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profilePicture: user.profilePicture,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goals: user.goals,
        mainGoal: user.mainGoal,
        fitnessLevel: user.fitnessLevel
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/change-password
 * Change user password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "required", message: "Current password and new password are required" }
        ]
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "newPassword", message: "New password must be at least 6 characters" }
        ]
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Current password is incorrect"
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/create-admin
 * Create a new admin (requires existing admin authentication)
 * SECURITY: This endpoint requires valid admin token
 */
export const createAdmin = async (req, res, next) => {
  try {
    // Check if user is authenticated and is admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        error: "Forbidden",
        message: "Only existing admins can create new admin accounts"
      });
    }

    const { firstName, lastName, email, password, phone, permissions } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "required", message: "First name, last name, email, and password are required" }
        ]
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "password", message: "Password must be at least 6 characters" }
        ]
      });
    }

    // Check if admin already exists in Admin collection
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "email", message: "Email already registered as admin" }
        ]
      });
    }

    // Also check User collection to prevent duplicate emails
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "email", message: "Email already registered" }
        ]
      });
    }

    // Create admin in Admin collection
    const admin = await Admin.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      permissions: permissions || {},
      isActive: true
    });

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    res.status(201).json({
      message: "Admin account created successfully",
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: 'admin',
        permissions: admin.permissions
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Logout user (client-side should remove token)
 */
export const logout = async (req, res) => {
  res.json({
    message: "Logout successful"
  });
};

// Reset tokens are now stored in the database (User/Admin models)

/**
 * POST /api/auth/forgot-password
 * Send password reset email
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // First check Admin collection, then User collection
    let account = await Admin.findOne({ email: email.toLowerCase() });
    let isAdmin = !!account;
    
    if (!account) {
      account = await User.findOne({ email: email.toLowerCase() });
    }
    
    if (!account) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent."
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Store token in database
    account.resetPasswordToken = resetToken;
    account.resetPasswordExpiry = resetTokenExpiry;
    await account.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    // Try to send email
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your_gmail_app_password_here') {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: account.email,
          subject: "Password Reset Request - Trackify",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #775fab 0%, #32284a 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">Password Reset</h1>
              </div>
              <div style="background: #f8f9fa; padding: 30px;">
                <p style="font-size: 16px; color: #333;">Hi ${account.firstName},</p>
                <p style="font-size: 16px; color: #333;">
                  You requested to reset your password. Click the button below to set a new password:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" style="background: #775fab; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Reset Password
                  </a>
                </div>
                <p style="font-size: 14px; color: #666;">
                  This link will expire in 1 hour. If you didn't request this, please ignore this email.
                </p>
                <p style="font-size: 14px; color: #666;">
                  Or copy and paste this link: <br>
                  <a href="${resetUrl}" style="color: #775fab;">${resetUrl}</a>
                </p>
              </div>
              <div style="background: #32284a; padding: 20px; text-align: center;">
                <p style="color: #999; margin: 0; font-size: 12px;">
                  © ${new Date().getFullYear()} Trackify. All rights reserved.
                </p>
              </div>
            </div>
          `
        });
        emailSent = true;
        console.log(`✉️ Password reset email sent to ${account.email}`);
      } catch (emailErr) {
        console.error("Failed to send reset email:", emailErr.message);
      }
    }

    // For development: log the reset URL if email not configured
    if (!emailSent) {
      console.log(`🔗 Password reset URL (email not configured): ${resetUrl}`);
    }

    res.status(200).json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent.",
      // Only include in development
      ...(process.env.NODE_ENV === 'development' && !emailSent && { resetUrl })
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    next(error);
  }
};

/**
 * POST /api/auth/reset-password/:token
 * Reset password with token
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Find account by reset token (check Admin first, then User)
    let account = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    }).select('+password');

    if (!account) {
      account = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: new Date() }
      }).select('+password');
    }

    if (!account) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    // Update password and clear reset token
    account.password = password;
    account.resetPasswordToken = null;
    account.resetPasswordExpiry = null;
    await account.save();

    console.log(`✅ Password reset successful for ${account.email}`);

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully. You can now login with your new password."
    });

  } catch (error) {
    console.error("Reset password error:", error);
    next(error);
  }
};

/**
 * GET /api/auth/verify-reset-token/:token
 * Verify if reset token is valid
 */
export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    // Check Admin collection first, then User collection
    let account = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }
    });

    if (!account) {
      account = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: new Date() }
      });
    }

    if (!account) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: "Invalid or expired reset token"
      });
    }

    res.status(200).json({
      success: true,
      valid: true,
      message: "Token is valid"
    });
  } catch (error) {
    console.error("Verify token error:", error);
    res.status(500).json({
      success: false,
      valid: false,
      message: "Error verifying token"
    });
  }
};