const express = require("express");
const { submitCode } = require("../controllers/submissionController"); 

const router = express.Router();

router.post("/submit", submitCode);

module.exports = router;
