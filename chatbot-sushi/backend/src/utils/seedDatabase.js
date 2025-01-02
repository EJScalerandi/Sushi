const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('../models/Menu');
const menuData = require('./data.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        await Menu.deleteMany(); // Limpia la colección para evitar duplicados
        console.log('Previous menu data deleted');
        await Menu.insertMany(menuData);
        console.log('Menu data seeded successfully');
        process.exit();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB or seeding data:', err);
        process.exit(1);
    });

