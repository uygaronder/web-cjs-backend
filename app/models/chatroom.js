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
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    }]
});

const Chatroom = mongoose.model('Chat', chatroomSchema);

module.exports = Chatroom;