const User = require('../models/user');

const findUserMiddleware = async (req, res, next) => {
    try {
        const userId = req.params.userId || req.headers['user-id'];

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = findUserMiddleware;