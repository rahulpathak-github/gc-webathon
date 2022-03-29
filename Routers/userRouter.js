const express = require("express");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

const router = express.Router();

router.get("/", authController.protect, userController.getAllUser);

router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser);

router
  .route("/:uid/notifications")
  .get(authController.protect, userController.getAllNotification)
  .post(authController.protect, userController.createNotification);

module.exports = router;
