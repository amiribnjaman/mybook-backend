const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  likeId: {
    type: String,
    required: true,
  },
  userId: [{
    type: Sring,
    required: true}
  ],
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

module.exports = mongoose.model("Like", likeSchema);
