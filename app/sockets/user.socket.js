const User = require('../models/user');

const { userSocketMap } = require('./userSocketMap');
const { emitUserData } = require('../services/userService');

module.exports = (io, socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User with ID ${userId} connected with socket ID ${socket.id}`);
        console.log('User socket map:', userSocketMap);
    } else {
        console.error('User ID is missing in handshake query');
    }

    socket.on("requestUserUpdate", () => {
        const userId = socket.handshake.query.userId;
    
        if (userId) {
            User.findByIdAndUpdate(userId)
                .then((user) => {
                    if (user) {
                        console.log('User updated:', user.username);
                        emitUserData(userId);
                    } else {
                        console.error('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                });
        } else {
            console.error('User ID is missing in handshake query');
        }
    })

    socket.on('disconnect', () => {
        console.log(`User with socket ID ${socket.id} disconnected`);
        delete userSocketMap[socket.id];
    });
};