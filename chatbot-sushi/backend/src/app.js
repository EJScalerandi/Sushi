const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menuRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');  // Importa las rutas del chatbot

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api', menuRoutes);
app.use('/api/chatbot', chatbotRoutes);  // Usa las rutas del chatbot

// Routes
app.get('/', (req, res) => {
    res.send('Chatbot Sushi API is running.');
});

module.exports = app;
