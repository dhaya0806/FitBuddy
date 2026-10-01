const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    age: {
      type: Number,
      default: null
    },

    gender: {
      type: String,
      default: ""
    },

    height: {
      type: Number,
      default: null
    },

    weight: {
      type: Number,
      default: null
    },

    fitnessGoal: {
      type: String,
      default: ""
    },

    activityLevel: {
      type: String,
      default: ""
    },

    profileCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);