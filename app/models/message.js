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
            required: true,
            default: false
        },
        replyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: function() {
                return this.isAReply;
            }
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
            required: function() {
                return this.type !== 'system';
            }
        },
        username: {
            type: String,
            required: function() {
                return this.type !== 'system';
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: 'text'
    },
    // Subtext is used for system messages to provide additional information user ids to point to profiles etc.
    subtext: {
        type: String,
        required: false
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;