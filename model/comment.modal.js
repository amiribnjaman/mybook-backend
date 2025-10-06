const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentId: {
    type: String,
    required: true,
  },
  userId: {
    type: Sring,
    required: true,
  },
  postId: {
    type: Sring,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
