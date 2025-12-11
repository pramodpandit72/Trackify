import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "trackify_secret_key_2025", {
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
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email }); // Log login attempt

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Validation failed",
        errors: [
          { field: "required", message: "Email and password are required" }
        ]
      });
    }

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    console.log('User found:', !!user); // Log if user exists

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
    console.log('Password valid:', isPasswordValid); // Log password validation

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = generateToken(user._id);

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
 * Create a new admin user (requires existing admin authentication)
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

    const { firstName, lastName, email, password, phone } = req.body;

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

    // Create admin user
    const admin = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      role: "admin",
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
        role: admin.role
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

// Store reset tokens temporarily (in production, use Redis or database)
const resetTokens = new Map();

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

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent."
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Store token (in production, store in database)
    resetTokens.set(resetToken, {
      userId: user._id,
      expiry: resetTokenExpiry
    });

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
          to: user.email,
          subject: "Password Reset Request - Trackify",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #775fab 0%, #32284a 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">Password Reset</h1>
              </div>
              <div style="background: #f8f9fa; padding: 30px;">
                <p style="font-size: 16px; color: #333;">Hi ${user.firstName},</p>
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
        console.log(`✉️ Password reset email sent to ${user.email}`);
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

    // Get token data
    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    // Check if token expired
    if (Date.now() > tokenData.expiry) {
      resetTokens.delete(token);
      return res.status(400).json({
        success: false,
        message: "Reset token has expired. Please request a new one."
      });
    }

    // Find user and update password
    const user = await User.findById(tokenData.userId).select('+password');

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    // Update password
    user.password = password;
    await user.save();

    // Delete used token
    resetTokens.delete(token);

    console.log(`✅ Password reset successful for ${user.email}`);

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
  const { token } = req.params;
  const tokenData = resetTokens.get(token);

  if (!tokenData || Date.now() > tokenData.expiry) {
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
};
