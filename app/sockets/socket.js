const socketIo = require('socket.io');

const chatSocket = require('./chat.socket.js');
const notificationSocket = require('./notification.socket.js');

function initializeSocket(server) {
    console.log("Initializing socket...");

    const io = socketIo(server, {
        cors: {
            origin: process.env.APP_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        chatSocket(chatNamespace, socket);
    });

    const notificationNamespace = io.of('/notification');
    notificationNamespace.on('connection', (socket) => {
        notificationSocket(notificationNamespace, socket);
    });
}

module.exports = initializeSocket;