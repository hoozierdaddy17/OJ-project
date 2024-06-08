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
      res.status(200).json(problem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // create new problem
  createProblem: async (req, res) => {
    const { name, difficulty, description } = req.body;
    const newProblem = new Problem({ name, difficulty, description });
    try {
      await newProblem.save();
      res.status(201).json(newProblem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // update problem
  updateProblem: async (req, res) => {
    const { name, difficulty, description } = req.body;
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(
        req.params.id,
        { name, difficulty, description },
        { new: true }
      );
      res.status(200).json(updatedProblem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // delete problem
  deleteProblem: async (req, res) => {
    try {
      await Problem.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Problem deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = problemController;
