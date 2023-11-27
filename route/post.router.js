const express = require("express");
const {
  createPost,
  getAllPost,
  createComment,
  deletePost,
  getOnePost,
} = require("../controller/post.controller");
const router = express.Router();


// Router
router.post("/create", createPost);
router.get("/allpost", getAllPost);
router.get("/get-one/:postId", getOnePost);
router.delete("/deletePost/:userId/:postId", deletePost);
router.patch("/createComment", createComment);

module.exports = router;
