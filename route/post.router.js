const express = require("express");
const {
  createPost,
  getAllPost,
  deletePost,
  getOnePost,
  updatePost,
    createComment,
  deleteComment
} = require("../controller/post.controller");
const router = express.Router();


// ROUTER
// POST ROUTER
router.post("/create", createPost);
router.get("/allpost", getAllPost);
router.get("/get-one/:postId", getOnePost);
router.patch("/update-post", updatePost);
router.delete("/deletePost/:userId/:postId", deletePost);

// COMMENT ROUTER
router.patch("/createComment", createComment);
router.delete("/deleteComment/:userId/:commentId/:postid", deleteComment);

module.exports = router;
