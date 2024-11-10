const User = require('../models/user');

const { userSocketMap } = require('../sockets/userSocketMap');

import { getIO } from '../sockets/socket';


async function emitUserData(userID) {
    try {
        const user = await User.findById(userID);
        const socketId = userSocketMap[userID];

        if (user && socketId) {
            return getIO().to(socketId).emit('updateUserData', user);
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { emitUserData };