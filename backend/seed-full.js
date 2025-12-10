import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/db/index.js';
import Exercise from './src/models/exercise.model.js';
import Trainer from './src/models/trainer.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB...\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await Exercise.deleteMany({});
    await Trainer.deleteMany({});
    console.log('✓ Cleared exercises and trainers\n');

    // Read exercises from frontend data file
    const exercisesFilePath = path.join(__dirname, '../frontend/src/data/exercisesLibrary.js');
    const exercisesFileContent = fs.readFileSync(exercisesFilePath, 'utf-8');
    
    // Extract the exercisesLibrary array using regex
    const match = exercisesFileContent.match(/export const exercisesLibrary = \[([\s\S]*?)\];/);
    if (match) {
      // Define the helper function and BASE_EXERCISE that the library uses
      const BASE_EXERCISE = {
        image: null,
        videoUrl: null,
        variants: []
      };
      const ex = (data) => ({ ...BASE_EXERCISE, ...data });
      
      // Create a temporary module to evaluate the array
      const exercisesCode = `[${match[1]}]`;
      const exercises = eval(exercisesCode);
      
      // Transform exercises to match the database schema
      const transformedExercises = exercises.map(exercise => ({
        name: exercise.name,
        category: exercise.category,
        muscleGroups: exercise.muscleGroups || [],
        difficulty: exercise.difficulty || 'Beginner',
        equipment: exercise.equipment || 'None',
        description: exercise.description || '',
        instructions: exercise.instructions || '',
        targetArea: exercise.targetArea || exercise.category,
        variants: exercise.variants || [],
        image: exercise.image || null,
        videoUrl: exercise.videoUrl || null
      }));

      // Insert exercises
      await Exercise.insertMany(transformedExercises);
      console.log(`✓ Seeded ${transformedExercises.length} exercises\n`);
    }

    // Seed Trainers
    const trainers = [
      {
        name: 'Amit Kumar',
        title: 'Certified Personal Trainer',
        bio: 'Specializes in weight loss and strength training with over 6 years of experience helping clients achieve their fitness goals.',
        specialties: ['Strength Training', 'Weight Loss', 'Body Building'],
        rating: 4.8,
        reviewsCount: 42,
        experienceYears: 6,
        profilePicture: '',
        pricePerSession: 30,
        location: 'Delhi, India',
        tags: ['ISSA Certified', 'Nutrition Expert', 'Contest Prep']
      },
      {
        name: 'Sneha Sharma',
        title: 'Nutrition & Fitness Coach',
        bio: 'Holistic approach combining nutrition and fitness for sustainable health transformations.',
        specialties: ['Nutrition', 'Yoga', 'Weight Management'],
        rating: 4.7,
        reviewsCount: 38,
        experienceYears: 5,
        pricePerSession: 35,
        location: 'Mumbai, India',
        tags: ['Certified Nutritionist', 'Yoga Instructor', 'Wellness Coach']
      },
      {
        name: 'Rajesh Patel',
        title: 'Athletic Performance Coach',
        bio: 'Former athlete specializing in sports performance, agility, and explosive power training.',
        specialties: ['Athletic Performance', 'Sports Training', 'Functional Fitness'],
        rating: 4.9,
        reviewsCount: 55,
        experienceYears: 8,
        pricePerSession: 40,
        location: 'Bangalore, India',
        tags: ['Sports Certified', 'Speed & Agility', 'Olympic Lifts']
      },
      {
        name: 'Priya Desai',
        title: 'Women\'s Fitness Specialist',
        bio: 'Specialized training programs for women focusing on toning, postnatal fitness, and overall wellness.',
        specialties: ['Women\'s Fitness', 'Postnatal', 'Toning'],
        rating: 4.6,
        reviewsCount: 31,
        experienceYears: 4,
        pricePerSession: 28,
        location: 'Pune, India',
        tags: ['Pre/Post Natal', 'Female Fitness', 'Body Transformation']
      },
      {
        name: 'Vikram Singh',
        title: 'CrossFit & HIIT Expert',
        bio: 'High-intensity interval training specialist with focus on functional movements and metabolic conditioning.',
        specialties: ['CrossFit', 'HIIT', 'Functional Training'],
        rating: 4.8,
        reviewsCount: 47,
        experienceYears: 7,
        pricePerSession: 38,
        location: 'Gurgaon, India',
        tags: ['CrossFit Level 2', 'HIIT Certified', 'Olympic Weightlifting']
      },
      {
        name: 'Kavita Nair',
        title: 'Senior Fitness & Rehabilitation',
        bio: 'Specialized in senior fitness, injury rehabilitation, and mobility training for all ages.',
        specialties: ['Senior Fitness', 'Rehabilitation', 'Mobility'],
        rating: 4.7,
        reviewsCount: 29,
        experienceYears: 6,
        pricePerSession: 32,
        location: 'Chennai, India',
        tags: ['Rehab Specialist', 'Senior Fitness', 'Physical Therapy']
      },
      {
        name: 'Arjun Reddy',
        title: 'Bodybuilding & Powerlifting Coach',
        bio: 'Competition-level bodybuilding and powerlifting coach with proven track record in contest prep.',
        specialties: ['Bodybuilding', 'Powerlifting', 'Contest Prep'],
        rating: 4.9,
        reviewsCount: 63,
        experienceYears: 10,
        pricePerSession: 45,
        location: 'Hyderabad, India',
        tags: ['IFBB Pro Coach', 'Powerlifting', 'Muscle Building']
      },
      {
        name: 'Meera Kapoor',
        title: 'Pilates & Core Specialist',
        bio: 'Certified Pilates instructor focusing on core strength, flexibility, and mind-body connection.',
        specialties: ['Pilates', 'Core Strength', 'Flexibility'],
        rating: 4.6,
        reviewsCount: 35,
        experienceYears: 5,
        pricePerSession: 33,
        location: 'Kolkata, India',
        tags: ['Pilates Certified', 'Flexibility Coach', 'Posture Correction']
      }
    ];

    await Trainer.insertMany(trainers);
    console.log(`✓ Seeded ${trainers.length} trainers\n`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
