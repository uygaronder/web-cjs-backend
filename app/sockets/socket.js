const socketIo = require('socket.io');

const chatSocket = require('./chat.socket.js');

function initializeSocket(server) {
    console.log("Initializing socket...");

    const io = socketIo(server, {
        cors: {
            origin: process.env.APP_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    //console.log("Socket initialized: ", io);

    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        console.log("User connected: ", socket.id);
        chatSocket(chatNamespace, socket);
    });
}

module.exports = initializeSocket;