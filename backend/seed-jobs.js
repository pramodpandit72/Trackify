import "dotenv/config";
import mongoose from "mongoose";
import Job from "./src/models/job.model.js";
import { DB_NAME } from "./src/constants.js";

const MONGODB_URI = process.env.MONGODB_URI;

const jobs = [
  {
    title: "Certified Personal Trainer",
    location: "Remote",
    type: "Full-time",
    department: "Training",
    description: "Join our team of elite trainers and help clients achieve their fitness goals through personalized virtual training. We're looking for NASM, ACE, or ISSA certified trainers with 3+ years of experience in personal training and excellent communication skills.",
    salary: "$45,000 - $65,000",
    requirements: [
      "NASM, ACE, or ISSA certification required",
      "3+ years training experience",
      "Excellent communication and interpersonal skills",
      "Experience with virtual training platforms",
      "Ability to create customized workout plans"
    ],
    isActive: true
  },
  {
    title: "Sports Performance Specialist",
    location: "Remote",
    type: "Full-time",
    department: "Training",
    description: "Work with athletes and fitness enthusiasts to optimize their performance through specialized training programs. You'll design sport-specific training protocols and help clients achieve peak performance.",
    salary: "$50,000 - $75,000",
    requirements: [
      "CSCS (Certified Strength and Conditioning Specialist) or equivalent",
      "Sports performance background with 4+ years experience",
      "Experience training athletes at collegiate or professional level",
      "Knowledge of periodization and program design",
      "Strong understanding of biomechanics"
    ],
    isActive: true
  },
  {
    title: "Wellness & Nutrition Coach",
    location: "Remote",
    type: "Part-time",
    department: "Training",
    description: "Guide clients on their wellness journey with personalized nutrition and lifestyle coaching. You'll help clients develop sustainable eating habits and achieve their health goals through evidence-based nutrition guidance.",
    salary: "$35,000 - $50,000",
    requirements: [
      "Certified Nutrition Coach or Registered Dietitian",
      "2+ years coaching experience",
      "Knowledge of macro tracking and meal planning",
      "Holistic wellness approach",
      "Excellent client communication skills"
    ],
    isActive: true
  },
  {
    title: "Senior Strength & Conditioning Coach",
    location: "Remote",
    type: "Full-time",
    department: "Training",
    description: "Lead our strength training programs and mentor junior trainers. You'll be responsible for program development, quality assurance, and helping shape the future of our training methodology.",
    salary: "$60,000 - $85,000",
    requirements: [
      "CSCS or similar advanced certification",
      "5+ years experience in strength & conditioning",
      "Leadership and mentoring experience",
      "Track record of client transformations",
      "Experience with program development and optimization"
    ],
    isActive: true
  },
  {
    title: "Group Fitness Instructor",
    location: "Remote",
    type: "Part-time",
    department: "Training",
    description: "Lead engaging virtual group fitness classes including HIIT, yoga, cycling, and more. You'll energize and motivate participants while ensuring safe and effective workouts.",
    salary: "$25 - $50 per class",
    requirements: [
      "Group fitness certification (ACE, AFAA, or similar)",
      "1+ years teaching group classes",
      "High energy and motivational personality",
      "Experience with virtual class delivery",
      "Flexibility in scheduling"
    ],
    isActive: true
  },
  {
    title: "Yoga & Mindfulness Instructor",
    location: "Remote",
    type: "Contract",
    department: "Training",
    description: "Guide clients through yoga sessions and mindfulness practices. Help our members find balance, reduce stress, and improve flexibility through virtual yoga instruction.",
    salary: "$30 - $60 per session",
    requirements: [
      "RYT-200 or RYT-500 certification",
      "2+ years teaching experience",
      "Knowledge of various yoga styles",
      "Experience with guided meditation",
      "Calm, reassuring presence"
    ],
    isActive: true
  }
];

async function seedJobs() {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log("Connected to MongoDB...\n");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("✓ Cleared existing jobs");

    // Insert new jobs
    const result = await Job.insertMany(jobs);
    console.log(`✓ Seeded ${result.length} jobs\n`);

    // Display seeded jobs
    console.log("📋 Jobs created:");
    result.forEach((job, idx) => {
      console.log(`   ${idx + 1}. ${job.title} (${job.type}) - ${job.salary}`);
    });

    console.log("\n✅ Job seeding completed successfully!");
  } catch (err) {
    console.error("❌ Error seeding jobs:", err);
  } finally {
    await mongoose.connection.close();
  }
}

seedJobs();
