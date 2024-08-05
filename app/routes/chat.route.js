const express = require('express');
const router = express.Router();

const Chatroom = require('../models/chatroom');
const Message = require('../models/message');

router.post("/createchatroom", (req, res) => {
    const { chatroomInfo, creator, invitedUsers, } = req.body;
    

    Chatroom.create({ ...chatroomInfo, users: [creator, ...invitedUsers] })
        .then(() => {
            res.send("New chat room created");
        });
});

router.get("/getChats", (req, res) => {
    const userID = req.query.userID;
    Chatroom.find({ users: userID })
        .then((chatrooms) => {
            res.send(chatrooms);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

router.get("/getMessages", (req, res) => {
    Chatroom.findById(req.query.id)
        .populate("messages")
        .then((chatroom) => {
            res.send(chatroom.messages);
        });
});

router.post("/newMessage", (req, res) => {
    req.body.sender = req.user._id;
    req.body.timestamp = new Date();
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