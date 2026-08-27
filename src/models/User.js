// src/models/User.js
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // store hashed password here
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", schema);
