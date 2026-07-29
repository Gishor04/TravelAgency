import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TourPackage from '../models/TourPackage.js';
import Destination from '../models/Destination.js';
import Blog from '../models/Blog.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import { MOCK_PACKAGES, MOCK_DESTINATIONS, MOCK_BLOGS, MOCK_REVIEWS } from './mockData.js';

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas Connected for Seeding...');

    await TourPackage.deleteMany();
    await Destination.deleteMany();
    await Blog.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();

    // Create Standard User
    const createdUser = await User.create({
      name: 'Sophia Martinez',
      email: 'sophia@example.com',
      password: 'password123',
      role: 'user'
    });

    // Create Admin User
    const createdAdmin = await User.create({
      name: 'Globevia Executive Admin',
      email: 'admin@globeviatravel.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log(`Created Admin User: ${createdAdmin.email} (role: ${createdAdmin.role})`);

    const createdPackages = await TourPackage.insertMany(MOCK_PACKAGES.map(({ _id, ...rest }) => rest));
    await Destination.insertMany(MOCK_DESTINATIONS.map(({ _id, ...rest }) => rest));
    await Blog.insertMany(MOCK_BLOGS.map(({ _id, ...rest }) => rest));

    const reviewsToInsert = MOCK_REVIEWS.map(({ _id, ...rest }) => ({
      ...rest,
      user: createdUser._id,
      tourPackage: createdPackages[0]._id
    }));

    await Review.insertMany(reviewsToInsert);

    console.log('✅ Database Seeded Successfully with Globevia Travel Admin & User accounts!');
    process.exit();
  } catch (error) {
    console.error(`Error with Seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
