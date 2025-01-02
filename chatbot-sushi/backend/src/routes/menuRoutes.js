// src/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { getMenuAPI, addMenuItemAPI, updateMenuItemAPI } = require('../controllers/menuController');

// Ruta para obtener todo el menú
router.get('/menu', getMenuAPI);

// Ruta para agregar un nuevo plato
router.post('/menu', addMenuItemAPI);

// Ruta para actualizar un plato existente
router.put('/menu/:id', updateMenuItemAPI);

module.exports = router;
