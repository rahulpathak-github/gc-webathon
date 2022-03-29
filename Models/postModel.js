const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      required: [true, "time of post creation is required"],
    },

    caption: {
      type: String,
    },

    fileId: {
      type: String,
      required: true,
    },

    taggedUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],

    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
