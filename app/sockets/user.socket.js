const User = require('../models/user');

const { userSocketMap } = require('./userSocketMap');

module.exports = (io, socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        socket.join(userId);
        console.log(`User with ID ${userId} connected`);
    } else {
        console.error('User ID is missing in handshake query');
    }

    socket.on("requestUserUpdate", () => {
        if (userId) {
            User.findById(userId)
                .then((user) => {
                    if (user) {
                        socket.to(userId).emit('userUpdated', user);
                        console.log('User data sent to room:', userId);
                    } else {
                        console.error('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error finding user:', error);
                });
        }
    });

    socket.on("updateUser", (newUserData) => {
        if (userId) {
            User.findByIdAndUpdate(userId, newUserData, { new: true })
                .then((updatedUser) => {
                    if (updatedUser) {
                        io.to(userId).emit('userUpdated', updatedUser);
                        console.log('User data updated for room:', userId);
                    } else {
                        console.error('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                });
        }
    });

    
    socket.on('disconnect', () => {
        console.log(`User with socket ID ${socket.id} disconnected`);
        delete userSocketMap[socket.id];
    });
};

const updateUserData = (user) => {
    const io = require('./socket').getIO();
    if (user._id) {
        io.to(user._id.toString()).emit('userUpdated', user);
        console.log('User data updated for room:', user._id);
    }
};
module.exports.updateUserData = updateUserData;
