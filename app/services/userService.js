const User = require('../models/user');

const { userSocketMap } = require('../sockets/userSocketMap');
const { updateUserData } = require('../sockets/user.socket');

async function emitUserData(userID) {
    try {
        const user = await User.findById(userID);
        if (user){
            updateUserData(user);
            console.log('Emitting user data:', user.username);
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { emitUserData };