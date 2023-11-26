const express = require("express");
const { createPost, getAllPost } = require("../controller/post.controller");
const router = express.Router();


// Router
router.post("/create", createPost);
router.get("/allpost", getAllPost);

module.exports = router;
