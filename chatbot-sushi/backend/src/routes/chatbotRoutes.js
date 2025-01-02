const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Ruta para manejar los mensajes del chatbot
router.post('/message', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    let response;

    // Responder con el menú si el usuario pide "menú"
    if (message.toLowerCase() === 'menú') {
        try {
            const menuItems = await Menu.find();
            response = 'Menú:\n' + menuItems.map(item => `${item.name}: ${item.price}`).join('\n');
        } catch (err) {
            response = 'Lo siento, no pude obtener el menú en este momento.';
        }
    } 
    // Responder a preguntas frecuentes
    else if (message.toLowerCase().includes('están abiertos')) {
        response = '¡Sí! Estamos abiertos de 12:00 PM a 10:00 PM todos los días.';
    } 
    // Responder a otras preguntas
    else {
        response = 'Lo siento, no entiendo esa pregunta. ¿Puedes preguntar otra cosa?';
    }

    res.json({ response });
});

module.exports = router;
