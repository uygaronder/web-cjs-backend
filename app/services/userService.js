const User = require('../models/user');

<<<<<<< HEAD
const { userSocketMap } = require('../sockets/userSocketMap');

import { getIO } from '../sockets/socket';

=======
const { updateUserData } = require('../sockets/user.socket');
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68

async function emitUserData(userID) {
    try {
        const user = await User.findById(userID);
        const socketId = userSocketMap[userID];

<<<<<<< HEAD
        if (user && socketId) {
            return getIO().to(socketId).emit('updateUserData', user);
=======
        if (user){
            updateUserData(user);
            console.log('Emitting user data:', user.username);
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { emitUserData };