module.exports = (io, socket) => {
    socket.on('initializeUser', (user) => {
        socket.user = user;
    });

    socket.on('listenForUpdates', (chatroomIds) => {
        if (!socket.user) {
            console.error('User not initialized');
            return;
        }

        chatroomIds.forEach(chatroomId => {
            socket.join(chatroomId);
            const currentTime = new Date().toISOString();
            console.log(`[${currentTime}] User ${socket.user._id} is listening to room ${chatroomId} for updates`);
        });
    });
};
