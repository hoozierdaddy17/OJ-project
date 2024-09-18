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

const prodOrigins = [process.env.FRONTEND_URL];
console.log(process.env.FRONTEND_URL);
const allowedOrigins = prodOrigins;
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} not allowed by cors`));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//Middleware
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
