const socketIo = require('socket.io');

const chatSocket = require('./chat.socket.js');
const notificationSocket = require('./notification.socket.js');
const userSocket = require('./user.socket.js');

<<<<<<< HEAD
let io;
=======
let userNamespace;

const initializeSocket = (server) => {
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68

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

    userNamespace = io.of('/user');
    userNamespace.on('connection', (socket) => {
        userSocket(userNamespace, socket);
    });
    
    
}

const getIO = () => {
<<<<<<< HEAD
    console.log('Getting IO');
    if (!io) {
        throw new Error('Socket.io not initialized');
    }

    return io;
}

module.exports = { initializeSocket, getIO };
=======
    if (!userNamespace) {
        throw new Error('Namespace not initialized');
    }
    return userNamespace;
}

module.exports = { initializeSocket, getIO };
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
