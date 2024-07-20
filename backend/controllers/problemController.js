const Problem = require("../models/Problem");
const path = require("path");
const fs = require("fs");
const { executeCpp } = require("../../compiler/executeCpp"); // Adjust path as necessary

const problemController = {
  // Get all problems
  getProblems: async (req, res) => {
    try {
      const problems = await Problem.find();
      res.status(200).json(problems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single problem
  getProblemByID: async (req, res) => {
    try {
      const problem = await Problem.findById(req.params.id);

      if (!problem) return res.status(404).json({ error: "Problem not found" });

      res.status(200).json(problem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new problem
  createProblem: async (req, res) => {
    const {
      title,
      difficulty,
      description,
      problemTags,
      sampleTestCases,
      hiddenTestCases,
    } = req.body;

    // Validate incoming data
    if (
      !title ||
      !description ||
      !difficulty ||
      !sampleTestCases ||
      sampleTestCases.length === 0 ||
      !hiddenTestCases ||
      hiddenTestCases.length === 0
    )
      return res.status(400).json({ error: "Please fill in all the fields" });

    // Validate sample & hidden test cases
    const validateTestCases = (testCases) => {
      return testCases.every((testCase) => testCase.input && testCase.output);
    };

    if (
      !validateTestCases(sampleTestCases) ||
      !validateTestCases(hiddenTestCases)
    ) {
      return res.status(400).json({ error: "Invalid test cases" });
    }

    try {
      const newProblem = new Problem({
        title,
        difficulty,
        description,
        problemTags,
        sampleTestCases,
        hiddenTestCases,
      });

      await newProblem.save();
      res.status(201).json(newProblem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  submitProblem: async (req, res) => {
    const { language, code } = req.body;
    const { id } = req.params;

    if (!code) {
      return res.status(400).json({ error: "Empty code!" });
    }

    try {
      const problem = await Problem.findById(id);

      if (!problem) {
        return res.status(404).json({ error: "Problem not found" });
      }

      if (language !== "cpp") {
        return res.status(400).json({ error: "Unsupported language" });
      }

      const results = [];
      const tempDir = path.join(__dirname, "../../temp");

      // Ensure the temporary directory exists
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Prepare the temporary files
      const filePath = path.join(tempDir, `${id}.cpp`);
      fs.writeFileSync(filePath, code);

      for (const testCase of problem.hiddenTestCases) {
        const inputPath = path.join(tempDir, `${id}_input.txt`);
        const outputPath = path.join(tempDir, `${id}_output.txt`);

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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update problem
  updateProblem: async (req, res) => {
    const {
      title,
      difficulty,
      description,
      problemTags,
      sampleTestCases,
      hiddenTestCases,
    } = req.body;

    try {
      const updatedProblem = await Problem.findByIdAndUpdate(
        req.params.id,
        {
          title,
          difficulty,
          description,
          problemTags,
          sampleTestCases,
          hiddenTestCases,
        },
        { new: true }
      );

      if (!updatedProblem)
        return res.status(404).json({ error: "Problem not found!" });

      res.status(200).json(updatedProblem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete problem
  deleteProblem: async (req, res) => {
    try {
      const deletedProblem = await Problem.findByIdAndDelete(req.params.id);

      if (!deletedProblem)
        return res.status(404).json({ error: "Problem not found!" });

      res.status(200).json({ message: "Problem deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = problemController;
