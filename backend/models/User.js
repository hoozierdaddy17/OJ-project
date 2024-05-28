const mongoose = require("mongoose");

// schema definition that defines structure of my documents
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxLength: 60,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 60,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    maxLength: 60,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxLength: 60,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// name of the model
const User = mongoose.model("User", userSchema);
module.exports = User;
