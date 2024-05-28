const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/login", logout);

module.exports = router; //export the router instance
