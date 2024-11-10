const socketIo = require('socket.io');

const User = require('../models/user');

const chatSocket = require('./chat.socket.js');
const notificationSocket = require('./notification.socket.js');
const userSocket = require('./user.socket.js');

let userNamespace;

const initializeSocket = (server) => {

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

    userNamespace = io.of('/user');
    userNamespace.on('connection', (socket) => {
        userSocket(userNamespace, socket);
    });
    
    
}

const getIO = () => {
    if (!userNamespace) {
        throw new Error('Namespace not initialized');
    }
    return userNamespace;
}

module.exports = { initializeSocket, getIO };