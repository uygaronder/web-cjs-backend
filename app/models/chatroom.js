const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    chatroomInfo: {
        name: {
            type: String,
            required: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        roomType: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        roomPublicity: {
            type: String,
            required: true
        },
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    }]
});

const Chatroom = mongoose.model('Chat', chatroomSchema);

module.exports = Chatroom;