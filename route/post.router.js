const express = require("express");
const {
  createPost,
  getAllPost,
  createComment,
  deletePost,
} = require("../controller/post.controller");
const router = express.Router();


// Router
router.post("/create", createPost);
router.get("/allpost", getAllPost);
router.patch("/createComment", createComment);
router.delete("/deletePost/:userId/:postId", deletePost);

module.exports = router;
