const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user profile
router.get("/", userController.getProfile);

// Update user profile
router.put("/", userController.updateProfile);

module.exports = router;
