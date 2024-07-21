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