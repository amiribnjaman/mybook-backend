const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: {
    type: [String],
    required: true,
  },
  lastMessage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
