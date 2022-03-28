const express = require("express");
const authController = require("../Controllers/authController");
const commentController = require("../Controllers/commentController");

const router = express.Router();

router.post("/", authController.protect, commentController.createComment);

router
  .route("/:id")
  .get(commentController.getAllReplies)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
