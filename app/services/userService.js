const User = require('../models/user');
const io = require('../sockets/socket');

async function updateUserData(userID, data) {
    try {
        const user = await User.findByIdAndUpdate(userID, data, { new: true });

        if (user){
            io.getIO().emit('updateUserData', user);
        }

        return user;
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = updateUserData;