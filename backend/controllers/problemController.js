const Problem = require("../models/Problem");

const problemController = {
  // get all problems
  getProblems: async (req, res) => {
    try {
      const problems = await Problem.find();
      res.status(200).json(problems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // get single problem
  getProblemByID: async (req, res) => {
    try {
      const problem = await Problem.findById(req.params.id);

      if (!problem) return res.status(404).json({ error: "Problem not found" });

      res.status(200).json(problem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // create new problem
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
      !sampleTestCases.length === 0 ||
      !hiddenTestCases ||
      !hiddenTestCases.length === 0
    )
      return res.status(400).json({ error: "Please fill in all the fields" });

    //Validate sample & hidden test cases
    const validateTestCases = (testCases) => {
      return testCases.every((testCase) => testCase.input && testCase.output);
    };

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

  // // run code for problem by ID
  // runProblem: async (req, res) => {
  //   const { problemId, code } = req.body;
  // }

  // update problem
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

  // delete problem
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
