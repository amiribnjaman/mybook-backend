const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userImg: {
    type: String,
    required: true,
  },

  postTitle: {
    type: String,
    required: false,
  },
  postContent: {
    type: String,
    required: false,
  },
  postCategory: {
    type: String,
    required: false,
  },
  postImgUrl: {
    type: String,
    required: false,
  },
  likes: { type: [String], default: [] },
  comments: [
    {
      id: String,
      postId: String,
      userId: String,
      comment: String,
      userName: String,
      userImg: String,
      createOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
