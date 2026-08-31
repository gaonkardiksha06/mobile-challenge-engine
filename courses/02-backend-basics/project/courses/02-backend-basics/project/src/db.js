import mongoose from 'mongoose';

/** Database schema connection layer */

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/mobile_challenge';

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGO_URI);

  return mongoose.connection;
}