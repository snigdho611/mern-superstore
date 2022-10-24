import mongoose from "mongoose";

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
    default: 0,
  },
});

export const User = mongoose.model("User", userSchema);