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

// Función para agregar un nuevo plato al menú
// Función para agregar un nuevo plato al menú
const addMenuItemAPI = async (req, res) => {
    console.log('POST request received at /api/menu');  // Verifica si esta línea se imprime
    const { name, description, price } = req.body;
    console.log('Body recibido:', req.body);  // Para ver si el cuerpo está llegando correctamente

    // Validar los datos
    if (!name || !description || !price) {
        return res.status(400).json({ error: 'Name, description, and price are required' });
    }

    try {
        // Crear el nuevo plato
        const newMenuItem = new Menu({ name, description, price });
        await newMenuItem.save();
        res.status(201).json({ message: 'Menu item added successfully', newMenuItem });
    } catch (error) {
        console.error('Error al agregar el plato:', error);  // Imprime los errores en consola
        res.status(500).json({ error: 'Error adding menu item', message: error.message });
    }
};

// Función para actualizar un plato existente
const updateMenuItemAPI = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Validar que al menos uno de los campos sea proporcionado
    if (!name && !description && !price) {
        return res.status(400).json({ error: 'Al menos uno de los campos debe ser proporcionado' });
    }

    try {
        // Buscar el plato por ID
        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ error: 'Plato no encontrado' });
        }

        // Actualizar los campos proporcionados
        if (name) menuItem.name = name;
        if (description) menuItem.description = description;
        if (price) menuItem.price = price;

        // Guardar los cambios
        await menuItem.save();

        res.status(200).json({ message: 'Plato actualizado con éxito', menuItem });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el plato', err });
    }
};

module.exports = { getMenu, getMenuAPI, addMenuItemAPI, updateMenuItemAPI };
