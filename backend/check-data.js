import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/db/index.js';
import Exercise from './src/models/exercise.model.js';
import Trainer from './src/models/trainer.model.js';

const checkData = async () => {
  try {
    await connectDB();
    
    const exerciseCount = await Exercise.countDocuments();
    const trainerCount = await Trainer.countDocuments();
    
    console.log(`\n📊 Database Statistics:`);
    console.log(`   Exercises: ${exerciseCount}`);
    console.log(`   Trainers: ${trainerCount}`);
    
    if (exerciseCount > 0) {
      console.log(`\n📝 Sample exercises:`);
      const exercises = await Exercise.find().limit(5).select('name category difficulty');
      exercises.forEach(ex => console.log(`   - ${ex.name} (${ex.category}, ${ex.difficulty})`));
    }
    
    if (trainerCount > 0) {
      console.log(`\n👥 Sample trainers:`);
      const trainers = await Trainer.find().limit(5).select('name title location');
      trainers.forEach(t => console.log(`   - ${t.name} - ${t.title}`));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkData();
