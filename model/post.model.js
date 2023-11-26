const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  userName: {
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
  posts: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Post", postSchema);
