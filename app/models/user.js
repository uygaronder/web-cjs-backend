const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    anonymous: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: function() {
            return !this.anonymous;
        }
    },
    password: {
        type: String,
        required: function() {
            return !this.anonymous;
        }
    },
    avatar: {
        type: String
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;