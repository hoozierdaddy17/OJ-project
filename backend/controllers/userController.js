const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {
  getProfile: async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting profile: ", error);
      res.status(500).send("Server Error while getting profile");
    }
  },

  updateProfile: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const token = req.header("Authorization");
      if (!token) {
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating profile: ", error);
      res.status(500).send("Server Error while updating profile");
    }
  },
};

module.exports = userController;
