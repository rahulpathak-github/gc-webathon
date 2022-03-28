const express = require("express");
const postController = require("./../Controllers/postController");
const authController = require("../Controllers/authController");
const commentController = require("../Controllers/commentController");

const router = express.Router();

router.post("/", authController.protect, postController.createPost);

router.get("/", postController.getAllPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(authController.protect, postController.deletePost);

router.get("/:id/comments", commentController.getAllComment);

module.exports = router;
