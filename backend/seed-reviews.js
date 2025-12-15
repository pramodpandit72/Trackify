import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/db/index.js';
import Review from './src/models/review.model.js';
import Trainer from './src/models/trainer.model.js';

const reviews = [];

const seedReviews = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB...');
    await Review.deleteMany({});
    const trainers = await Trainer.find({});
    const trainerMap = {};
    trainers.forEach(t => { trainerMap[t.name] = t._id; });
    const reviewDocs = reviews.map(r => ({
      userName: r.userName,
      rating: r.rating,
      comment: r.comment,
      trainer: trainerMap[r.trainerName],
    })).filter(r => r.trainer);
    await Review.insertMany(reviewDocs);
    console.log(`✓ Seeded ${reviewDocs.length} reviews`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
    process.exit(1);
  }
};

seedReviews();
