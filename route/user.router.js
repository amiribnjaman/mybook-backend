const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getSingleUser,
  forgotPassCheck,
  resetPassword,
  createNotification,
  getNotification,
  readNotification,
  toggleFollow,
} = require("../controller/user.controller");
const jwtAuthentication = require("../middleware/authentication");

// Router
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/getsingleuser/:userId", getSingleUser);
router.patch("/toggle-follow", jwtAuthentication, toggleFollow);
router.post("/forgot-pass-check", forgotPassCheck);
router.patch("/password-reset", resetPassword);

// Notification
router.patch("/notification", createNotification);
router.get("/get-notification/:userId", getNotification);
router.patch("/read-notification", readNotification);


module.exports = router;