const { v4: uuidv4 } = require("uuid");
const Conversation = require("../model/conversation.model");
const Message = require("../model/message.model");

// CREATE OR GETTING CONVERSATION
const createOrgetConversation = async (req, res) => {
  const [senderId, recieverId] = req.body;

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = new Conversation({ members: [senderId, recieverId] });
      await conversation.save();
    }

    res.json({ status: 200, data: conversation });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GETTING ALL CONVERSATION OF A USER
const getAllConversation = async (req, res) => {
  const { userId } = req.params;
  const conversations = await findOne({ members: { $in: [userId] } });

  res.json({ status: 200, data: conversations });
};

// CREATE MESSAGE ON DB
const createMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  try {
    const msg = new Message({ conversationId, sender, text });
    await msg.save();
    await Conversation.findOneAndUpdate(conversationId, { lastMessage: text });

    res.json({ status: 201, data: msg });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// GET ALL MESSAGES
const getMessage = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({
      conversationId: conversationId,
    }).sort({ createdAt: 1 });

    res.json({ status: 200, data: messages });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  createOrgetConversation,
  getAllConversation,
  createMessage,
  getMessage,
};
