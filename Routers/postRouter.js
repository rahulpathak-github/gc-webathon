const express = require("express");
const postController = require("./../Controllers/postController");

const router = express.Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
