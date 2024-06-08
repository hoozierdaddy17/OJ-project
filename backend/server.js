// Import required modules/dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB database
const dbConnection = require("./database/db");
dbConnection();

// Define routes
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const problemRoute = require("./routes/authRoutes");

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
 app.use("/problem", problemRoute);

// Start/activate the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
