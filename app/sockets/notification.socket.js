module.exports = (io, socket) => {
    socket.on('initializeUser', (user) => {
        socket.user = user;

        console.log(`User initialized: ${socket.user._id}`);
    });

    socket.on('listenForUpdates', (chatroomIds) => {
        if (!socket.user) {
            console.error('User not initialized');
            return;
        }

        chatroomIds.forEach(chatroomId => {
            socket.join(chatroomId);
            console.log(`User ${socket.user._id} is listening to room ${chatroomId} for updates`);
        });
    });
};
