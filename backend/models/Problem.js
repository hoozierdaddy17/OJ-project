const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  problemTags: {
    type: [String], // Array of strings for multiple tags,
    required: true,
  },
  sampleTestCases: {
    type: [testCaseSchema],
    required: true,
  },
  hiddenTestCases: {
    type: [testCaseSchema],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // To format date using Moment.js:
    // get: (val) => moment(val).format('YYYY-MM-DD HH:mm:ss')
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
