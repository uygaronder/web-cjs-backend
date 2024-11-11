const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Chatroom = require('../models/chatroom');
const Message = require('../models/message');
const User = require('../models/user');

const { emitUserData } = require('../services/userService');

router.post("/createchatroom", (req, res) => {
    const { chatroomInfo, creator } = req.body;
    const newChatroom = new Chatroom({
        users: [creator],
        chatroomInfo,
        messages: [],
        roomCode: Math.random().toString(36).substring(2, 12),
    });

    User.findById(creator).then((user) => {
        user.chats.push(newChatroom._id);
        user.save().then(() => {
            newChatroom.save()
                .then(() => {
                    emitUserData(user._id);
                    res.send(newChatroom);
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
    //console.log(chatroomID," : " , userID);

    if (!mongoose.Types.ObjectId.isValid(chatroomID) || !mongoose.Types.ObjectId.isValid(userID)) {
        return res.send({ error: "Invalid ID" });
    }

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
                    emitUserData(userID);
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
                    emitUserData(userID);
                    res.send("User removed from chatroom");
                });
            });
        });
    }
    );
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
        user: {
            _id: req.body.user._id,
            username: req.body.user.username,
        },
        reply: req.body.reply,
    });
    newMessage.save()
        .then(() => {
            Chatroom.findById(req.body.chatroomID)
                .then((chatroom) => {
                    chatroom.lastMessage = newMessage._id;
                    chatroom.save()
                        .then(() => {
                            emitUserData(req.body.user._id);
<<<<<<< HEAD

=======
>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
                            res.json(newMessage);
                        });
                });
        });
});

router.get("/getPublicChatrooms", (req, res) => {
    // the search "algorithm" is pretty bad need rework
    const nameQuery = req.query.query ? { "chatroomInfo.name": new RegExp(req.query.query, 'i') } : {};

    Chatroom.find({ "chatroomInfo.roomPublicity": "public", ...nameQuery })
        .then((chatrooms) => {
            const chatroomsWithNamesAndAvatars = chatrooms.map((chatroom) => {
                return {
                    name: chatroom.chatroomInfo.name,
                    avatar: chatroom.chatroomInfo.avatar,
                    userCount: chatroom.users.length,
                    id: chatroom._id,
                };
            });
            res.send(chatroomsWithNamesAndAvatars);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

router.post("/deleteChatRoom", (req, res) => {
    User.find({
        chats: req.body.chatroomID
    })
        .then((users) => {
            users.forEach((user) => {
                user.chats = user.chats.filter((chatID) => chatID != req.body.chatroomID);
                user.save();
                emitUserData(user._id);
            });
            Chatroom.findByIdAndDelete(req.body.chatroomID)
                .then(() => {
                    res.send("Chat room deleted");
                });
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

router.post("/joinPublicChatroom", (req, res) => {
    const { chatroomID, userID } = req
        .body
    ;

    const newMessage = new Message({
        type: "system",
        text: `${req.body.username} has joined the chat`,
        chatroom: chatroomID,
    });
    newMessage.save().then(() => {
        Chatroom.findById(chatroomID).then((chatroom) => {
            chatroom.users.push(userID);
            chatroom.save().then(() => {
                User.findById(userID).then((user) => {
                    user.chats.push(chatroomID);
                    user.save().then(() => {
                        emitUserData(userID);
                        res.send("User added to chatroom");
                    });
                });
            });
        });
    });
});

router.post("/leaveChatroom", (req, res) => {
    const { chatroomID, userID } = req
        .body
    ;
    console.log("leaving chatroom: ", chatroomID, " : ", userID);

    const newMessage = new Message({
        type: "system",
        text: `${req.body.username} has left the chat`,
        chatroom: chatroomID,
    });
    newMessage.save().then(() => {
        Chatroom.findById(chatroomID).then((chatroom) => {
            chatroom.users = chatroom.users.filter((id) => id != userID);
            chatroom.save().then(() => {
                User.findById(userID).then((user) => {
                    user.chats = user.chats.filter((id) => id != chatroomID);
                    user.save().then(() => {
                        emitUserData(userID);
                        res.send("User removed from chatroom");
                    });
                });
            });
        });
    });
});

module.exports = router;