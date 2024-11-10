const socketIo = require('socket.io');

const chatSocket = require('./chat.socket.js');
const notificationSocket = require('./notification.socket.js');
const userSocket = require('./user.socket.js');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
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

    const userNamespace = io.of('/user');
    userNamespace.on('connection', (socket) => {
        userSocket(userNamespace, socket);
    });
}

const getIO = () => {
    console.log('Getting IO');
    if (!io) {
        throw new Error('Socket.io not initialized');
    }

    return io;
}

module.exports = { initializeSocket, getIO };
