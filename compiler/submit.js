const express = require("express");
const fs = require("fs");
const path = require("path");
const { executeCpp } = require("./executeCpp"); 

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { language, code, hiddenTestCases } = req.body;

  if (!code || !hiddenTestCases) {
    return res.status(400).json({ error: "Empty code or missing test cases!" });
  }

  if (language !== "cpp") {
    return res.status(400).json({ error: "Unsupported language" });
  }

  const results = [];
  const tempDir = path.join(__dirname, "temp");

  // Ensure the temporary directory exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Prepare the temporary files
  const filePath = path.join(tempDir, `submission.cpp`);
  fs.writeFileSync(filePath, code);

  for (const testCase of hiddenTestCases) {
    const inputPath = path.join(tempDir, `input.txt`);
    const outputPath = path.join(tempDir, `output.txt`);

    // Save the input to a temporary file
    fs.writeFileSync(inputPath, testCase.input);

    // Execute the C++ code
    try {
      await executeCpp(filePath, inputPath, outputPath);
      const actualOutput = fs.readFileSync(outputPath, "utf8").trim();
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
