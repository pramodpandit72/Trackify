import jwt from "jsonwebtoken";
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
 * POST /api/auth/logout
 * Logout user (client-side should remove token)
 */
export const logout = async (req, res) => {
  res.json({
    message: "Logout successful"
  });
};
