
// mongoose schema connection setup
import mongoose from "mongoose";
import { logger } from "./logger.js";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/backend_basics";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    logger.info("Database connected");

    return mongoose.connection;
  } catch (err) {
    logger.error(`Database connection failed: ${err.message}`);
    throw err;
  }
}

export default connectDB;