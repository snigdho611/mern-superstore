import mongoose from "mongoose";

const databaseConnection = async (callback: any) => {
  try {
    if (process.env.DATABASE_URL) {
      const client = await mongoose.connect(process.env.DATABASE_URL);
      if (client) {
        console.log("Database connection completed");
      }
      callback();
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export default databaseConnection;