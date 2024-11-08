const User = require('../models/user');

module.exports = (io, socket) => {
    socket.on("requestUserUpdate", () => {
        const userId = socket.handshake.query.userId;
    
        if (userId) {
            User.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true })
                .then((user) => {
                    if (user) {
                        socket.emit('userUpdated', user);
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
    });
};
