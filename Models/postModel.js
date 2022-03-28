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

    img: {
      type: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
