const mongoose = require("mongoose");
const User = require("./users");
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
