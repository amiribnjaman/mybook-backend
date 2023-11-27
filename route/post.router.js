const express = require("express");
const {
  createPost,
  getAllPost,
  createComment,
  deletePost,
  getOnePost,
  updatePost,
} = require("../controller/post.controller");
const router = express.Router();


// Router
router.post("/create", createPost);
router.get("/allpost", getAllPost);
router.get("/get-one/:postId", getOnePost);
router.patch("/update-post", updatePost);
router.delete("/deletePost/:userId/:postId", deletePost);
router.patch("/createComment", createComment);

module.exports = router;
