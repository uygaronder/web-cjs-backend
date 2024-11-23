module.exports = (io, socket) => {
    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
    });

    // Listen for and broadcast messages
    socket.on('sendMessage', (messageData) => {
        //console.log(`User sent message to room ${messageData.chatroomID}`);

        io.to(messageData.chatroomID).emit('receiveMessage', messageData.message);

        io.to(messageData.chatroomID).emit('newMessageNotification', {
            chatroomID: messageData.chatroomID,
            message: messageData.message,
        });
    });

    // Listen for and broadcast typing events
    socket.on('typing', (data) => {
        socket.to(data.roomID).emit('typing', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected`);
    });

    socket.on('loadOlderMessages', (data) => {
        console.log("Loading older messages: ", data);
        Message.find({ chatroom: data.chatroomID })
            .sort({ createdAt: -1 })
            .skip(data.skip)
            .limit(10)
            .populate('user', 'username')
            .then((messages) => {
                socket.emit('olderMessages', messages);
            });
    });

    socket.on('userJoinedChatroom', (data) => {
        console.log("User joined chatroom: ", data);

        const message = {
                chatroom: data.chatroomID,
                user: {
                    username: "System",
                },
                type: "system",
                text: `${data.username} has joined the chatroom`,
                createdAt: new Date(),
        };

        socket.to(data.chatroomID).emit("userJoinedReceive", message);
    });

    socket.on('userLeftChatroom', (data) => {
        console.log("User left chatroom: ", data);

        const message = {
            chatroom: data.chatroomID,
            user: {
                username: "System",
            },
            type: "system",
            text: `${data.username} has left the chatroom`,
            createdAt: new Date(),
        }

        socket.to(data.chatroomID).emit("userLeftReceive", message);
    });

    socket.on('typing', (data) => {
        socket.to(data.chatroomID).emit("userTypingReceive", data);
    });

    socket.on("stopTyping", (data) => {
        socket.to(data.chatroomID).emit("userStoppedTypingReceive", data);
    });
}