import mongoose from "mongoose";
import { logger } from "./logger.js";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/backend_basics";

export async function connectDB() {
  // ✅ If already connected, reuse the connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    // ✅ No deprecated options — Mongoose v8 handles defaults internally
    await mongoose.connect(MONGO_URI);

    logger.info("Database connected");
    return mongoose.connection;
  } catch (err) {
    logger.error(`Database connection failed: ${err.message}`);
    throw err;
  }
}
