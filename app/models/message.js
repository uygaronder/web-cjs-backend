const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: false
        }
    ],
    reply: {
        isAReply: {
            type: Boolean,
            required: true
        },
        replyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: false
        }
    },
    reactions: [{
            reaction: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
        }
    ],
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;