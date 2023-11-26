const express = require("express");
const { createPost, getAllPost, createComment } = require("../controller/post.controller");
const router = express.Router();


// Router
router.post("/create", createPost);
router.get("/allpost", getAllPost);
router.patch("/createComment", createComment);

module.exports = router;
