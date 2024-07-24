import { Router } from 'express';

import { Chatroom, Message } from '../models';

const router = Router();

router.post("/newChatRoom", (req, res) => {
    const { name, users } = req.body;
    
    Chatroom.create({ name, users })
        .then(() => {
            res.send("New chat room created");
        });
});

// get chats for a user
router.get("/getChats", (req, res) => {
    Chatroom.find({ users: req.user._id })
        .then((chatrooms) => {
            res.send(chatrooms);
        });
});

// get messages for a chat room
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

export default router;