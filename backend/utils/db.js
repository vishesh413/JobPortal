import dotenv from 'dotenv';
dotenv.config(); // ✅ This line is required to load .env variables

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1); // optional but useful
    }
};

export default connectDB;
