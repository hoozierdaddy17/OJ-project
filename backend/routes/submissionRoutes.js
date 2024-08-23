const express = require("express");
const {
  submitCode,
  getSubmissions,
} = require("../controllers/submissionController");

const router = express.Router();

// Route for code submission
router.post("/", submitCode);

// Route for fetching submissions
router.get("/", getSubmissions);

module.exports = router;
