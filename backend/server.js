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

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB database
const dbConnection = require("./database/db");
dbConnection();

// Define routes
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const problemRoute = require("./routes/problemRoutes");
const submissionRoute = require("./routes/submissionRoutes"); 


// Public routes
app.use("/auth", authRoute);
app.use("/profile", userRoute);

// Protected routes
app.use("/problems", problemRoute);
app.use("/submissions", submissionRoute);


// Start/activate the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
