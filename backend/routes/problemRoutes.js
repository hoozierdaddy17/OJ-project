const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");

// get all problems
router.get("/problems", problemController.getProblems);

// get single problem by ID
router.get("/problems/:id", problemController.getProblemByID);

// create new problem
router.post("/problems", problemController.createProblem);

// update problem by ID
router.put("/problems/:id", problemController.updateProblem);

// delete problem by ID
router.delete("/problems/:id", problemController.deleteProblem);

module.exports = router;
