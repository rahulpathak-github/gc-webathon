const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      required: [true, "time of notification is required"],
    },

    category: {
      type: String,
      enum: ["post", "user", "comment"],
    },

    categoryId: {
      type: mongoose.Schema.ObjectId,
    },

    body: {
      type: String,
      required: [true, "body of notification is required"],
    },

    hasRead: {
      type: Boolean,
      required: [true, "status of notification read/unread is required"],
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
