const socketIo = require('socket.io');

const chatSocket = require('./chat.socket.js');
const chatroomSocket = require('./chatroom.socket.js');

function initializeSocket(server) {
    const io = socketIo(server);

    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        console.log("New client conneted to chat namespace: ", socket.id);

        chatSocket(chatNamespace, socket);
    });

    const chatroomNamespace = io.of('/chatroom');
    chatroomNamespace.on('connection', (socket) => {
        console.log("New client conneted to chatroom namespace: ", socket.id);

        chatroomSocket(chatroomNamespace, socket);
    });
}

module.exports = initializeSocket;