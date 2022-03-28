const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      required: [true, "time of comment made is required"],
    },

    body: {
      type: String,
      required: [true, "body of comment is required"],
    },

    replies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],

    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
