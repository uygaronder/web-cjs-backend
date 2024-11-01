const express = require('express');
const router = express.Router();

const Chatroom = require('../models/chatroom');
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

router.post("/addUserToChatroom", (req, res) => {
    const { chatroomID, userID } = req
        .body
    ;
    Chatroom.findById(chatroomID).then((chatroom) => {
        chatroom.users.push(userID);
        chatroom.save().then(() => {
            User.findById(userID).then((user) => {
                user.chats.push(chatroomID);
                user.save().then(() => {
                    res.send("User added to chatroom");
                });
            });
        });
    });
});

router.post("/removeUserFromChatroom", (req, res) => {
    const { chatroomID, userID } = req
        .body
    ;
    Chatroom.findById(chatroomID).then((chatroom) => {
        chatroom.users = chatroom.users.filter((id) => id != userID);
        chatroom.save().then(() => {
            User.findById(userID).then((user) => {
                user.chats = user.chats.filter((id) => id != chatroomID);
                user.save().then(() => {
                    res.send("User removed from chatroom");
                });
            });
        });
    }
    );
});

module.exports = router;