const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const Submission = require("../models/Submission");

const submitCode = async (req, res) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the token to get user information
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const { problemId, language, code, hiddenTestCases } = req.body;

    if (!userId || !problemId) {
      return res
        .status(400)
        .json({ error: "User and problem ID are required" });
    }
    if (!code || !hiddenTestCases) {
      return res
        .status(400)
        .json({ error: "Empty code or missing test cases!" });
    }

    // Send code to the compiler backend for execution
    const response = await axios.post("http://localhost:7500/submit", {
      language,
      code,
      hiddenTestCases,
    });

    const results = response.data;
    const allPassed = results.every((result) => result.passed);
    const verdict = allPassed ? "Accepted" : "Failed";

    // Store the submission result in the database
    const submission = new Submission({
      user: userId,
      problemId,
      language,
      verdict,
      results,
    });

    await submission.save();

    // Console log the saved submission object
    console.log("Saved Submission:", submission);

    res.status(200).json({ results, verdict });
  } catch (error) {
    console.error("Error submitting code:", error.message);
    res.status(500).json({ error: "An error occurred during submission." });
  }
};

// Handle fetching submissions
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user_id: req.user });
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
};

module.exports = {
  submitCode,
  getSubmissions,
};
