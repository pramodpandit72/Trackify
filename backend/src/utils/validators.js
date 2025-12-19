export const validateExercise = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push("Exercise name is required and must be at least 3 characters");
  }

  if (!data.category || !["Chest", "Legs", "Back", "Shoulders", "Arms", "Core"].includes(data.category)) {
    errors.push("Valid category is required: Chest, Legs, Back, Shoulders, Arms, or Core");
  }

  if (!data.muscleGroups || !Array.isArray(data.muscleGroups) || data.muscleGroups.length === 0) {
    errors.push("At least one muscle group is required");
  }

  if (data.difficulty && !["Beginner", "Intermediate", "Advanced"].includes(data.difficulty)) {
    errors.push("Difficulty must be: Beginner, Intermediate, or Advanced");
  }

  if (data.description && data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters if provided");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateReview = (data) => {
  const errors = [];

  if (!data.trainer) {
    errors.push("Trainer ID is required");
  }

  if (!data.userName || data.userName.trim().length < 2) {
    errors.push("User name is required and must be at least 2 characters");
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push("Rating must be between 1 and 5");
  }

  if (data.comment && data.comment.trim().length < 5) {
    errors.push("Comment must be at least 5 characters if provided");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateJob = (data) => {
  const errors = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push("Job title is required and must be at least 3 characters");
  }

  if (data.description && data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters if provided");
  }

  if (data.salary && typeof data.salary !== "string") {
    errors.push("Salary must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateJobApplication = (data) => {
  const errors = [];

  if (!data.jobId) {
    errors.push("Job ID is required");
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push("Phone number format is invalid");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTrainer = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Trainer name is required and must be at least 2 characters");
  }

  if (data.rating && (data.rating < 0 || data.rating > 5)) {
    errors.push("Rating must be between 0 and 5");
  }

  if (data.pricePerSession && data.pricePerSession < 0) {
    errors.push("Price per session must be positive");
  }

  if (data.experienceYears && data.experienceYears < 0) {
    errors.push("Experience years must be positive");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Helper functions
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  const regex = /^(\+\d{1,3}[- ]?)?\d{6,14}$/;
  return regex.test(phone.replace(/\D/g, ""));
};

// Parse pagination params
export const getPaginationParams = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 12));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

// Build filter object
export const buildExerciseFilter = (query) => {
  const filter = {};

  if (query.search) {
    const searchRegex = new RegExp(query.search, "i");
    filter.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { targetArea: searchRegex }
    ];
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.difficulty) {
    filter.difficulty = query.difficulty;
  }

  if (query.muscleGroup) {
    filter.muscleGroups = query.muscleGroup;
  }

  return filter;
};
