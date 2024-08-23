const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");

// get all problems
router.get("/", problemController.getProblems);

// get single problem by ID
router.get("/:id", problemController.getProblemByID);

// create new problem
router.post("/create", problemController.createProblem);

// // run code for problem by ID
// router.post("/problems/:id/run", problemController.runProblem);

// submit code for problem by ID
router.post("/:id/submit", problemController.submitProblem);

// update problem by ID
router.put("/:id", problemController.updateProblem);

// delete problem by ID
router.delete("/:id", problemController.deleteProblem);

module.exports = router;
