import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import Trainer from "./models/trainer.model.js";
import Review from "./models/review.model.js";
import Job from "./models/job.model.js";
import Exercise from "./models/exercise.model.js";

const seed = async () => {
  await connectDB();

  // Clear only exercises
  await Exercise.deleteMany({});

  // Seed comprehensive exercise data
  const exercises = [
    // Chest exercises
    {
      name: "Push Up",
      category: "Chest",
      muscleGroups: ["Chest", "Triceps", "Shoulders"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      description: "Push up is a fundamental bodyweight exercise that strengthens the chest, shoulders, and triceps.",
      instructions: "Start in plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor. Push back up to the starting position.",
      targetArea: "Chest",
      variants: ["Wide Push Up", "Diamond Push Up", "Decline Push Up"]
    },
    {
      name: "Bench Press",
      category: "Chest",
      muscleGroups: ["Chest", "Triceps", "Shoulders"],
      difficulty: "Intermediate",
      equipment: "Barbell, Bench",
      description: "The bench press is a compound exercise that primarily works the chest muscles.",
      instructions: "Lie on a flat bench, grip the barbell shoulder-width apart, lower it to your chest, then push it back up.",
      targetArea: "Chest"
    },
    {
      name: "Dumbbell Flye",
      category: "Chest",
      muscleGroups: ["Chest"],
      difficulty: "Intermediate",
      equipment: "Dumbbells, Bench",
      description: "Dumbbell flye isolates the chest muscles through a controlled arc motion.",
      instructions: "Lie on a bench, hold dumbbells above chest with arms extended, lower weights in an arc motion until you feel a stretch.",
      targetArea: "Chest"
    },
    
    // Back exercises
    {
      name: "Pull Up",
      category: "Back",
      muscleGroups: ["Back", "Biceps"],
      difficulty: "Intermediate",
      equipment: "Pull Up Bar",
      description: "Pull ups are an excellent upper body exercise that strengthens the back and biceps.",
      instructions: "Grab a pull up bar with hands shoulder-width apart. Pull your body up until your chin is above the bar. Lower yourself back down.",
      targetArea: "Back",
      variants: ["Wide Grip Pull Up", "Close Grip Pull Up", "Assisted Pull Up"]
    },
    {
      name: "Bent Over Barbell Row",
      category: "Back",
      muscleGroups: ["Back", "Biceps"],
      difficulty: "Intermediate",
      equipment: "Barbell",
      description: "A fundamental back exercise that builds strength and muscle in the back.",
      instructions: "Bend forward at the hips, keep your back straight, pull the barbell towards your chest, then lower it.",
      targetArea: "Back"
    },
    {
      name: "Deadlift",
      category: "Back",
      muscleGroups: ["Back", "Hamstrings", "Glutes"],
      difficulty: "Advanced",
      equipment: "Barbell",
      description: "Deadlift is a compound exercise that works multiple muscle groups.",
      instructions: "Stand with feet hip-width apart, grip the barbell, keep your back straight, and lift it off the ground.",
      targetArea: "Back"
    },

    // Legs exercises
    {
      name: "Squat",
      category: "Legs",
      muscleGroups: ["Quads", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      description: "Squats are fundamental lower body exercises that build leg strength and power.",
      instructions: "Stand with feet shoulder-width apart, lower your hips back and down, keep your chest up, then return to standing.",
      targetArea: "Legs",
      variants: ["Goblet Squat", "Front Squat", "Bulgarian Split Squat"]
    },
    {
      name: "Leg Press",
      category: "Legs",
      muscleGroups: ["Quads", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      equipment: "Leg Press Machine",
      description: "Leg press machine exercise that targets the lower body muscles safely.",
      instructions: "Sit on the machine, place your feet on the platform shoulder-width apart, push the platform away, then return to starting position.",
      targetArea: "Legs"
    },
    {
      name: "Lunges",
      category: "Legs",
      muscleGroups: ["Quads", "Hamstrings", "Glutes"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      description: "Lunges are excellent for building leg strength and improving balance.",
      instructions: "Step forward with one leg, lower your hips until both knees are bent at 90 degrees, push back to starting position.",
      targetArea: "Legs",
      variants: ["Walking Lunges", "Reverse Lunges", "Stationary Lunges"]
    },

    // Shoulders exercises
    {
      name: "Shoulder Press",
      category: "Shoulders",
      muscleGroups: ["Shoulders", "Triceps"],
      difficulty: "Intermediate",
      equipment: "Dumbbells",
      description: "Shoulder press is a classic exercise for building shoulder strength and size.",
      instructions: "Hold dumbbells at shoulder height, press them overhead, lower them back to shoulder height.",
      targetArea: "Shoulders"
    },
    {
      name: "Lateral Raise",
      category: "Shoulders",
      muscleGroups: ["Shoulders"],
      difficulty: "Beginner",
      equipment: "Dumbbells",
      description: "Lateral raises isolate the shoulder muscles through a side-to-side motion.",
      instructions: "Stand with feet hip-width apart, hold dumbbells at your sides, raise them to shoulder height, lower back down.",
      targetArea: "Shoulders"
    },

    // Arms exercises
    {
      name: "Bicep Curl",
      category: "Arms",
      muscleGroups: ["Biceps"],
      difficulty: "Beginner",
      equipment: "Dumbbells",
      description: "Bicep curls are classic exercises for building arm strength.",
      instructions: "Stand with feet shoulder-width apart, curl the weights up towards your shoulders, lower them back down.",
      targetArea: "Arms",
      variants: ["Barbell Curl", "Cable Curl", "Concentration Curl"]
    },
    {
      name: "Tricep Dips",
      category: "Arms",
      muscleGroups: ["Triceps"],
      difficulty: "Intermediate",
      equipment: "Dip Bar",
      description: "Tricep dips effectively target and strengthen the triceps.",
      instructions: "Grip parallel bars, lower your body by bending your elbows, push back up to starting position.",
      targetArea: "Arms"
    },

    // Core exercises
    {
      name: "Plank",
      category: "Core",
      muscleGroups: ["Abs", "Core"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      description: "Planks are excellent for core strengthening and stability.",
      instructions: "Get in a forearm plank position with elbows under your shoulders, keep your body straight, hold this position.",
      targetArea: "Core",
      variants: ["Side Plank", "High Plank", "Dynamic Plank"]
    },
    {
      name: "Crunches",
      category: "Core",
      muscleGroups: ["Abs"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      description: "Crunches are fundamental abdominal exercises for core strength.",
      instructions: "Lie on your back with knees bent, curl your shoulders towards your hips, lower back down.",
      targetArea: "Core"
    },
    {
      name: "Mountain Climbers",
      category: "Core",
      muscleGroups: ["Abs", "Core", "Cardio"],
      difficulty: "Intermediate",
      equipment: "Bodyweight",
      description: "Mountain climbers are a dynamic core exercise that also provides cardiovascular benefits.",
      instructions: "Start in plank position, bring your knees up to your chest alternately in a running motion.",
      targetArea: "Core"
    }
  ];

  await Exercise.insertMany(exercises);
  console.log(`Seeded ${exercises.length} exercises successfully`);

  console.log("Seed data inserted");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
