import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './src/db/index.js';

const dropCollections = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB...\n');

    // Drop trainers collection to remove old indexes
    await mongoose.connection.db.dropCollection('trainers').catch(() => console.log('Trainers collection does not exist'));
    
    console.log('✓ Dropped trainers collection (including indexes)\n');
    console.log('Now run: node seed-full.js');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

dropCollections();
