// src/controllers/menuController.js
const Menu = require('../models/Menu');

// Obtener todo el menú para el chatbot
const getMenu = async () => {
    try {
        const menu = await Menu.find();
        return menu;
    } catch (error) {
        throw new Error('Error fetching menu');
    }
};

// Obtener el menú para la API REST
const getMenuAPI = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the menu' });
    }
};

module.exports = { getMenu, getMenuAPI };
