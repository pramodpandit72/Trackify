import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trainer from './src/models/trainer.model.js';

dotenv.config();

async function listTrainers() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URI);
  const trainers = await Trainer.find({}, { _id: 1, name: 1, email: 1 });
  console.log('Trainers:');
  trainers.forEach(t => {
    console.log(`Name: ${t.name}, _id: ${t._id}, email: ${t.email}`);
  });
  await mongoose.disconnect();
}

listTrainers();
