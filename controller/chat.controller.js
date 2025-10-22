const { v4: uuidv4 } = require("uuid");
const conversationModel = require("../model/conversation.model");

// CREATE OR GETTING CONVERSATION
const createOrgetConversation = async (req, res) => {
  const [senderId, recieverId] = req.body;

  try {
    const conversation = await conversationModel.findOne({
      members: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = new conversationModel({ members: [senderId, recieverId] });
      await conversation.save();
      }
      
      res.json({status: 200, data: conversation})
  } catch (error) {
      res.status(500).send(error.message);
  }
};

module.exports = { createOrgetConversation,
};
