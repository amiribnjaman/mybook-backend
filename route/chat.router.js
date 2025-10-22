const express = require("express");
const {
  createOrgetConversation,
  getAllConversation,
  createMessage,
  getMessage,
} = require("../controller/chat.controller");
const router = express.Router();


router.patch("/conversation", createOrgetConversation);
router.get("/conversation/:userId", getAllConversation);

router.get("/message/:conversationId", getMessage);

router.post("/message", createMessage);

module.exports = router;
