module.exports = (io, socket) => {
    socket.on('joinRoom', (roomID) => {
        socket.join(roomID);
    });

    // Listen for and broadcast messages
    socket.on('sendMessage', (messageData) => {
<<<<<<< HEAD
=======
        //console.log(`User sent message to room ${messageData.chatroomID}`);

>>>>>>> 9f024f5039e7487ef1fcc518706357f9f4708a68
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
        socket.to(data.chatroomID).emit("userJoinedReceive", data); // Match the frontend
    });

    socket.on('userLeftChatroom', (data) => {
        socket.to(data.chatroomID).emit("userLeftReceive", data); // Match the frontend
    });

    socket.on('typing', (data) => {
        socket.to(data.chatroomID).emit("userTypingReceive", data); // Match the frontend
    });

    socket.on("stopTyping", (data) => {
        socket.to(data.chatroomID).emit("userStoppedTypingReceive", data); // Match the frontend
    });
}