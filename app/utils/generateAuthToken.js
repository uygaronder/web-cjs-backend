// generate auth token

const crypto = require('crypto');
const User = require('../models/user');

const generateAuthToken = async (user) => {
    const authToken = crypto.randomBytes(16).toString('hex');
    const authTokenExpiration = new Date(Date.now() + 3600000); // 1 hour
    user.settings.authToken = authToken;
    user.settings.authTokenExpiration = authTokenExpiration;
    await user.save();
    return {authToken, authTokenExpiration};
}

module.exports = generateAuthToken;