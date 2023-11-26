const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  forgotPassCheck,
  resetPassword,
} = require("../controller/user.controller");

// Router
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-pass-check", forgotPassCheck);
router.patch("/password-reset", resetPassword);

module.exports = router;