// PERFORM:
// user registration, user login, token generation, token refresh, & logout functionalities

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  // signup route handler
  signup: async (req, res) => {
    try {
      // Validate inputs
      const { firstname, lastname, username, email, password, isAdmin } =
        req.body;

      // Validate email format using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid email format" });
      }

      if (
        !(
          firstname &&
          lastname &&
          username &&
          email &&
          password &&
          isAdmin !== undefined
        )
      ) {
        return res
          .status(400)
          .json({ success: false, msg: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        if (existingUser.email === email) {
          return res
            .status(400)
            .json({ success: false, msg: "Email is already registered" });
        } else if (existingUser.username === username) {
          return res
            .status(400)
            .json({ success: false, msg: "Username is already taken" });
        }
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in DB
      const newUser = await User.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        isAdmin,
      });

      // Generate JWT token and save in cookies
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, isAdmin: true },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );
      // Tokens are stored on client side in cookies or local storage
      newUser.token = token;
      newUser.password = undefined;

      res.status(201).json({ message: "User created successfully!", newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },

  // login route handler
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate inputs
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, msg: "Email and password are required" });
      }

      // Validate email format using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid email format" });
      }

      // Check if user exists in DB
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect email or password" });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect email or password" });
      }

      // Generate JWT token and send in response
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      // Including user information in the response
      res.status(200).json({
        token,
        userid: user._id,
        isAdmin: user.isAdmin,
        firstname: user.firstname,
        lastname: user.lastname,
        message: `Logged in successfully! Welcome, ${user.firstname} ${user.lastname}.`,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Server Error");
    }
  },

  // logout route handler
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = authController;
