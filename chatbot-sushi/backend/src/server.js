const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // Importa correctamente 'app'

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conectar a MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
