const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
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
        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: false
        }
    },
    reactions: [
        {
        type: String,
        required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;