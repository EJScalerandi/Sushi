const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// GET /api/menu
router.get('/menu', async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the menu' });
    }
});

module.exports = router;
