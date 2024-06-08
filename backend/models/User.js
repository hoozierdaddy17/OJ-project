const mongoose = require("mongoose");

// schema definition that defines structure of my documents
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 60,
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 60,
  },
  username: {
    type: String,
    required: true,
    maxLength: 60,
  },
  email: {
    type: String,
    required: true,
    maxLength: 60,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

// name of the model
const User = mongoose.model("User", userSchema);
module.exports = User;
