const express = require('express');
const router = express.Router();

const Chatroom = require('../models/chatroom');
const Message = require('../models/message');
const User = require('../models/user');

router.post("/createchatroom", (req, res) => {
    const { chatroomInfo, creator } = req.body;
    const newChatroom = new Chatroom({
        users: [creator],
        chatroomInfo,
        messages: [],
    });
    User.findById(creator).then((user) => {
        user.chats.push(newChatroom._id);
        user.save().then(() => {
            newChatroom.save()
                .then(() => {
                    res.send("Chatroom created");
                })
                .catch((error) => {
                    res.status(500).send(error.message);
                });
        });
    });
});

router.get("/getChats", (req, res) => {
    const userID = req.query.userID;
    User.findById(userID)
        .then((user) => {
            const chatroomIds = user.chats;
            Chatroom.find({ _id: { $in: chatroomIds }, users: userID })
                .populate({
                    path: 'lastMessage',
                })
                .then((chatrooms) => {
                    const chatroomsWithLastMessage = chatrooms.map((chatroom) => {
                        const lastMessage = chatroom.lastMessage;
                        if (lastMessage) {
                            chatroom.lastMessage = lastMessage.text;
                        }
                        return chatroom;
                    });
                    res.send(chatroomsWithLastMessage);
                })
                .catch((error) => {
                    res.status(500).send(error.message);
                });
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

router.get("/getChatroom", (req, res) => {
    const chatroomID = req.query.chatroomID;
    const userID = req.query.userID;
    Chatroom.findOne({ _id: chatroomID, users: userID })
        .then((chatroom) => {
            if (!chatroom) {
                return res.status(404).send("Chatroom not found");
            }
            Message.find({ chatroom: chatroomID })
                .populate('user', 'username')
                .then((messages) => {
                    chatroom.messages = messages;
                    res.send(chatroom);
                })
                .catch((error) => {
                    res.status(500).send(error.message);
                });
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

router.get("/getMessages", (req, res) => {
    const chatroomID = req.query.chatroomID
    Message.find({ chatroom: chatroomID })
        .populate('user', 'username')
        .then((messages) => {
            res.send(messages);
        });
});

router.get("/getLastMessage", (req, res) => {
    const chatroomID = req.query.chatroomID;
    Chatroom.findById(chatroomID)
        .populate({ path: 'lastMessage', populate: { path: 'user', select: 'username' } })
        .then((chatroom) => {
            res.send(chatroom.lastMessage);
        });
});

router.post("/newMessage", (req, res) => {
    const newMessage = new Message({
        text: req.body.message,
        chatroom: req.body.chatroomID,
        reply: req.body.reply,
        user: req.body.userID,
    });
    newMessage.save()
        .then(() => {
            Chatroom.findById(req.body.chatroomID)
                .then((chatroom) => {
                    chatroom.lastMessage = newMessage._id;
                    chatroom.save()
                        .then(() => {
                            res.send("Message sent");
                        });
                });
        });
});

router.get("/getPublicChatrooms", (req, res) => {
    Chatroom.find({ chatroomInfo: { private: false } })
        .then((chatrooms) => {
            res.send(chatrooms);
        });
});

router.post("/deleteChatRoom", (req, res) => {
    Chatroom.findByIdAndDelete(req.body.id)
        .then(() => {
            res.send("Chat room deleted");
        });
}
);

router.post("/deleteMessage", (req, res) => {
    Message.findById(req.body.id)
        .then((message) => {
            message.text = "This message has been deleted";
            message.image = "";
            message.replies = [];
            message.reactions = [];
            message.user = null;
            message.save()
                .then(() => {
                    res.send("Message deleted");
                });
        });
});


module.exports = router;