const express = require("express");
const { createOrgetConversation } = require("../controller/chat.controller");
const router = express.Router();


router.post("/conversation", createOrgetConversation);

module.exports = router;
