import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // store hashed password here
  },
  { timestamps: true }
);

// ✅ Prevent recompilation errors in dev/test
export const User = mongoose.models.User || mongoose.model("User", userSchema);
