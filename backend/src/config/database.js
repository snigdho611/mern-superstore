const mongoose = require("mongoose");

const databaseConnection = async (callback) => {
  try {
    const client = await mongoose.connect(process.env.DATABASE_URL);
    if (client) {
      console.log("Database connection completed");
    }
    callback();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = databaseConnection;
