const express = require("express");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

const router = express.Router();

router.get("/", authController.protect, userController.getAllUser);

router.get("/:id", authController.protect, userController.getUser);

module.exports = router;
