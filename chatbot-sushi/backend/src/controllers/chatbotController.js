const { getMenu } = require('./menuController'); // Importar el controlador de menú

// Función para manejar los mensajes del chatbot
const handleMessage = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    let response = '';
    const lowerMessage = message.toLowerCase();

    // Responder con el menú si el usuario pide "menú"
    if (lowerMessage === 'menú') {
        try {
            const menuItems = await getMenu(); // Llamada al controlador getMenu
            response = 'Menú:\n' + menuItems.map(item => `${item.name}: $${item.price}`).join('\n');
        } catch (err) {
            response = 'Lo siento, no pude obtener el menú en este momento.';
        }
    } 
    // Responder a preguntas sobre horarios
    else if (lowerMessage.includes('están abiertos') || lowerMessage.includes('horario')) {
        response = '¡Sí! Estamos abiertos de 12:00 PM a 10:00 PM todos los días.';
    } 
    // Responder a preguntas sobre el tipo de comida
    else if (lowerMessage.includes('qué tipo de comida') || lowerMessage.includes('qué servís')) {
        response = 'Servimos una variedad de platos, incluyendo sushi, ramen, tempura y otras delicias asiáticas.';
    } 
    // Responder a preguntas sobre un plato específico del menú
    else if (lowerMessage.includes('precio de')) {
        const dish = lowerMessage.split('precio de')[1].trim();
        try {
            const menuItems = await getMenu(); // Llamada al controlador getMenu
            const item = menuItems.find(item => item.name.toLowerCase().includes(dish));
            if (item) {
                response = `El precio de ${item.name} es $${item.price}. Descripción: ${item.description}`;
            } else {
                response = `Lo siento, no encontramos un plato llamado ${dish} en el menú.`;
            }
        } catch (err) {
            response = 'Lo siento, no pude obtener el precio de ese plato en este momento.';
        }
    } 
    // Responder a preguntas sobre la ubicación
    else if (lowerMessage.includes('ubicación') || lowerMessage.includes('dónde están')) {
        response = 'Estamos ubicados en la Calle Ficticia 123, Ciudad Ficticia. ¡Ven a visitarnos!';
    } 
    // Responder a preguntas sobre opciones para vegetarianos
    else if (lowerMessage.includes('vegetariano') || lowerMessage.includes('vegano')) {
        response = '¡Sí! Tenemos opciones vegetarianas y veganas como sushi de aguacate, ensaladas y más.';
    } 
    // Responder a preguntas sobre el tiempo de entrega
    else if (lowerMessage.includes('tiempo de entrega') || lowerMessage.includes('cuánto tarda')) {
        response = 'El tiempo de entrega es de aproximadamente 30 a 45 minutos dependiendo de la ubicación.';
    } 
    // Responder a preguntas sobre promociones o descuentos
    else if (lowerMessage.includes('promociones') || lowerMessage.includes('descuento')) {
        response = '¡Claro! Tenemos promociones especiales los fines de semana. ¡Síguenos en nuestras redes sociales para más detalles!';
    } 
    // Responder a preguntas sobre pedidos online
    else if (lowerMessage.includes('pedidos online') || lowerMessage.includes('cómo pedir')) {
        response = 'Puedes hacer tus pedidos a través de nuestra página web o llamando al número 123-456-7890.';
    } 
    // Responder a preguntas sobre reservas
    else if (lowerMessage.includes('reservas') || lowerMessage.includes('reservar mesa')) {
        response = '¡Claro! Para reservar una mesa, llámanos al 123-456-7890 o visita nuestra página web.';
    } 
    // Responder a preguntas sobre alergias alimentarias
    else if (lowerMessage.includes('alergias') || lowerMessage.includes('alergia')) {
        response = 'Nuestro menú contiene alimentos como gluten, frutos secos y mariscos. Por favor, infórmanos sobre cualquier alergia antes de hacer tu pedido.';
    } 
    // Responder a preguntas generales sobre la empresa
    else if (lowerMessage.includes('quiénes son') || lowerMessage.includes('qué es')) {
        response = 'Somos un restaurante especializado en comida asiática, ofreciendo platos como sushi, ramen, y mucho más. ¡Te esperamos!';
    }
    // Responder a la opción de ayuda
    else if (lowerMessage.includes('ayuda') || lowerMessage.includes('cómo funciona')) {
        response = '¡Hola! Puedes preguntarme sobre el menú, precios, horarios de apertura, ubicación, reservas y más. ¿Cómo puedo ayudarte hoy?';
    } 
    // Responder a otras preguntas
    else {
        response = 'Lo siento, no entiendo esa pregunta. ¿Puedes preguntar otra cosa? Si necesitas ayuda, solo escribe "ayuda".';
    }

    res.json({ response });
};

module.exports = { handleMessage };
