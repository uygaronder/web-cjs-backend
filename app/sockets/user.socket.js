const User = require('../models/user');

const { userSocketMap } = require('./userSocketMap');
const { emitUserData } = require('../services/userService');

module.exports = (io, socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
<<<<<<< HEAD
        userSocketMap[userId] = socket.id;
        console.log(`User with ID ${userId} connected with socket ID ${socket.id}`);
        console.log('User socket map:', userSocketMap);
=======
        socket.join(userId);
        console.log(`User with ID ${userId} connected`);
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
    } else {
        console.error('User ID is missing in handshake query');
    }

    socket.on("requestUserUpdate", () => {
        if (userId) {
<<<<<<< HEAD
            User.findByIdAndUpdate(userId)
                .then((user) => {
                    if (user) {
                        console.log('User updated:', user.username);
                        emitUserData(userId);
=======
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
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
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
<<<<<<< HEAD
};
=======
};

const updateUserData = (user) => {
    const io = require('./socket').getIO();

    console.log('User data:', user._id);
    if (user._id) {
        io.to(user._id.toString()).emit('userUpdated', user);
        console.log('User data updated for room:', user._id);
    }
};

module.exports.updateUserData = updateUserData;
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
