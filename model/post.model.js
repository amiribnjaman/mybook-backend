const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: false,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  comments: {
    type: Array,
    required: false,
  },
  Likes: {
    type: Array,
    required: false,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
