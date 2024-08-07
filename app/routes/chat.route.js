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
                    path: 'messages',
                    options: { sort: { createdAt: -1 }, limit: 1 }
                })
                .then((chatrooms) => {
                    res.send(chatrooms);
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
        res.send(chatroom);
    })
});

router.post("/newMessage", (req, res) => {
    req.body.sender = req.user._id;
    Message.create(req.body)
        .then(() => {
            Chat
                .findByIdAndUpdate(req
                    .body.room, {
                        $push: {
                            messages: Message._id
                        }
                    })
                .then(() => {
                    res.send("New message created");
                });
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
            message.save()
                .then(() => {
                    res.send("Message deleted");
                });
        });
});


module.exports = router;