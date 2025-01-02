const Menu = require('../models/Menu');

// Obtener todo el menú
const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu', error });
    }
};

module.exports = { getMenu };
