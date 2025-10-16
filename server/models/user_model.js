import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: "" },
  score: { type: Number, default: 0, index: true }
});

export const User = mongoose.model("User", userSchema);
