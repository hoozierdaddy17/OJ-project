// Import mongoose
const mongoose = require("mongoose");

// Import dotenv
require("dotenv").config();

// Connect to the database

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
    });
    console.log("Connected to database!");
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
  }
};

module.exports = dbConnection;
