const express = require("express");
const router = express.Router();
const { signupUser } = require("../controller/user.controller");

// Router
router.post("/signup", signupUser);