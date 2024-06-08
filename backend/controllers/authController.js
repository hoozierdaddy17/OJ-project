// PERFORM:
// user registration, user login, token generation, token refresh, & logout functionalities

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  // signup route handler
  signup: async (req, res) => {
    console.log("success");
    try {
      //Validate inputs
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
        !(firstname && lastname && username && email && password && isAdmin)
      ) {
        return res.status(400).json({
          success: false,
          msg: "All fields are required",
        });
      }
      // check if user already exists

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({
            success: false,
            msg: "Email is already registered",
          });
        } else if (existingUser.username === username) {
          return res.status(400).json({
            success: false,
            msg: "Username is already taken",
          });
        }
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user in DB
      const newUser = await User.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        isAdmin: isAdmin == "T" ? true : false,
      });

      // generate JWT token and save in cookies
      // userId comes from DB
      const token = jwt.sign(
        { id: newUser._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );
      // tokens are stored on client side in cookies or local storage
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
      // check for valid inputs
      const { username, email, password } = req.body;
      if (!(email && password && username)) {
        return res.status(400).send("All fields are required");
      }

      // check if user exists in db(find user by email)
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).send("Incorrect credentials, User not found");

      //   check if username matches
      if (username !== user.username)
        res.status(400).send("Username doesn't match");

      // check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Incorrect password");
      }

      // generate JWT token and save in cookies
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      // sent to frontend
      user.token = token;
      // no need to send password to frontend
      user.password = undefined;
      // this does not get stored in DB only gets updated in user object created above
      //only affects the data sent to the client in the HTTP response

      // store token in cookies with options

      const options = {
        // in miliseconds
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true, //only manipulate by server not by client
      };

      // send the token
      res.status(200).cookie("token", token, options).json({
        message: "Logged in successfully",
        success: true, //checks
        token,
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
