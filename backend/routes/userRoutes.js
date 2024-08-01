const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user profile
router.get("/", userController.getProfile);

// Update user profile
router.put("/", userController.updateProfile);

//Get admin/user role
router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
