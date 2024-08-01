// submissionController.js

const axios = require("axios");
const Submission = require("../models/Submission"); structure

/**
 * Handle code submission for a problem
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const submitCode = async (req, res) => {
  const { userId, problemId, language, code, hiddenTestCases } = req.body;

  try {
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
      user_id: userId,
      prob_id: problemId,
      language,
      verdict,
      results,
    });

    await submission.save();

    res.status(200).json({ results, verdict });
  } catch (error) {
    console.error("Error submitting code:", error);
    res.status(500).json({ error: "An error occurred during submission." });
  }
};

module.exports = {
  submitCode,
};
