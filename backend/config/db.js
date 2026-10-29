import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PromptToInvoice";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("DB CONNECTED");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};
