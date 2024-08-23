const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  verdict: { type: String, required: true },
  language: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
