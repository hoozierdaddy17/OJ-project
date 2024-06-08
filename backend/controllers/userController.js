const User = require("../models/User");

const userController = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },

  updateProfile: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password; //must hash it

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = userController;
