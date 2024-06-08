const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  problemTags: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
