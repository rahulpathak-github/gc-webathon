const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    handle: {
      type: String,
      unique: true,
      required: [true, "user handle is required"],
    },

    name: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: [validator.isEmail, "Provide a vaild email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    dob: {
      type: Date,
    },

    dateJoined: {
      type: Date,
      required: [true, "date of joining is required"],
    },

    coverPic: {
      type: String,
    },

    profilePic: {
      type: String,
    },

    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    notifications: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Notification",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  correctPassword
) {
  return await bcrypt.compare(enteredPassword, correctPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
