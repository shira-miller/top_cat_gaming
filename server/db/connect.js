import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(`mongodb+srv://${config.userDB}:${config.passDB}@cluster0.a9w5hjt.mongodb.net/top_cat_gaming`);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
