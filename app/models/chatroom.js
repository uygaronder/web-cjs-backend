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
            required: true,
        },
        roomType: {
            type: String,
            required: true,
            default: 'group'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        roomPublicity: {
            type: String,
            default: 'private',
            required: true
        },
        invitedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
        admins: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: false
    }
});

const Chatroom = mongoose.model('Chat', chatroomSchema);

module.exports = Chatroom;