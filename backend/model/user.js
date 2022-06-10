const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
  balance: {
    type: Number,
    // required: true,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;