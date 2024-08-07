const express = require("express");
const fs = require("fs");
const path = require("path");
const { executeCpp } = require("./executeCpp");
const { executePython } = require("./executePython");
const { executeJava } = require("./executeJava");

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { language, code, hiddenTestCases } = req.body;

  if (!code || !hiddenTestCases) {
    return res.status(400).json({ error: "Empty code or missing test cases!" });
  }

  const results = [];
  const tempDir = path.join(__dirname, "temp", "submission");

  // Ensure the temporary directory exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Define file paths and execution functions based on language
  let filePath;
  let executeFunction;
  const inputPath = path.join(tempDir, "input.txt");

  switch (language) {
    case "cpp":
      filePath = path.join(tempDir, "submission.cpp");
      executeFunction = executeCpp;
      break;
    case "c":
      filePath = path.join(tempDir, "submission.cpp");
      executeFunction = executeCpp;
      break;
    case "python":
      filePath = path.join(tempDir, "submission.py");
      executeFunction = executePython;
      break;
    case "java":
      filePath = path.join(tempDir, "Submission.java");
      executeFunction = executeJava;
      break;
    default:
      return res.status(400).json({ error: "Unsupported language" });
  }

  fs.writeFileSync(filePath, code);

  for (const testCase of hiddenTestCases) {
    fs.writeFileSync(inputPath, testCase.input);

    try {
      const outputData = await executeFunction(filePath, inputPath);
      const actualOutput = outputData.trim();
      const expectedOutput = testCase.output.trim();
      const passed = actualOutput === expectedOutput;

      results.push({
        input: testCase.input,
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
        passed: passed,
      });
    } catch (error) {
      results.push({
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: null,
        passed: false,
        error: error.message,
      });
    }
  }

  res.status(200).json(results);
});

module.exports = router;
