// src/routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Ruta para manejar los mensajes del chatbot
router.post('/message', chatbotController.handleMessage);

module.exports = router;
