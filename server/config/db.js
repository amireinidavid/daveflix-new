// connect mongodb
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGODB Connected");
  } catch (error) {
    console.log(`Error: ${error.message} `);
    process.exit(1);
  }
};
