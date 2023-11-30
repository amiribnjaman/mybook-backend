const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  forgotPassCheck,
  resetPassword,
  createNotification,
  getNotification,
} = require("../controller/user.controller");

// Router
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-pass-check", forgotPassCheck);
router.patch("/password-reset", resetPassword);

// Notification
router.patch("/notification", createNotification);
router.get("/get-notification/:userId", getNotification);


module.exports = router;