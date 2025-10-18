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
  commentLikes,
  
} = require("../controller/post.controller");
const jwtAuthentication = require("../middleware/authentication");
const router = express.Router();


// ROUTER
// POST ROUTER
router.post("/create", jwtAuthentication, createPost);
router.get("/allpost/:userId", getAllPost);
router.get("/get-one/:userId/:postId", jwtAuthentication, getOnePost);
router.patch("/update-post", jwtAuthentication, updatePost);
router.delete("/deletePost/:userId/:postId", jwtAuthentication, deletePost);

// COMMENT ROUTER
router.patch("/createComment",jwtAuthentication, createComment);
router.patch("/update-comment",jwtAuthentication, updateComment);
router.delete(
  "/deleteComment/:userId/:commentId/:postid", jwtAuthentication,deleteComment
);

// REPLY ROUTER
router.patch("/create-reply", createReply);

// INTERACTION ROUTER
router.patch("/interaction", postInteraction)
router.patch("/comment-likes", commentLikes)

module.exports = router;
