const express = require("express");
const {
  createPost,
  getAllPost,
  deletePost,
  getOnePost,
  updatePost,
  createComment,
  updateComment,
  deleteComment,
  createReply,
  postInteraction,
  commentLikes
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
router.patch("/update-comment", updateComment);
router.delete("/deleteComment/:userId/:commentId/:postid", deleteComment);

// REPLY ROUTER
router.patch("/create-reply", createReply);

// REACT
router.patch("/post-likes", postInteraction)
router.patch("/comment-likes", commentLikes)

module.exports = router;
