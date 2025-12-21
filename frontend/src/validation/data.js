import {z} from "zod";

export const personalInfoSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Email is required"),
    phone: z.string().min(10, "Phone number is too short"),
});

export const goalsInfoSchema = z.object({
    goals: z.array(z.string("Should be string")).min(1,"Minimum one goal is required"),
    mainGoal: z.string(),
});

export const measurementsInfoSchema = z.object({
    height: z.number("Height must be number").min(1, "Height must be greater than 0").max(300, "Invalid input"),
    weight: z.number("Weight must be number").min(1, "Weight must be greater than 0").max(300, "Invalid input"),
    age: z
    .number("Age should be number")
    .min(10, "Minimum age must be greater than 10")
    .max(120, "Age must be realistic"),
    gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {message: "Gender is required"}),
});

export const fitnessLevelSchema = z.object({
    fitnessLevel: z.enum(["beginner", "intermediate", "advanced"], {message: "Fitness level is required"}),
});

export const credentialsInfoSchema = z.object({
    password: z
		.string("password must be string")
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must be less than 50 characters"),
});