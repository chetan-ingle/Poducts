import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1); //process.exit(1) means exit with failure
  }
};
