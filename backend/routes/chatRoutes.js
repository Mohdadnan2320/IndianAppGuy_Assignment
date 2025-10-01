const express = require('express');
const { handleChatPrompt } = require('../controllers/chatController');
const router = express.Router();

router.post('/generate', handleChatPrompt);

module.exports = router;