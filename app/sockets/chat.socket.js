module.exports = (io, socket) => {
    console.log('A user connected');

    // Listen for and broadcast messages
    socket.on('sendMessage', (messageData) => {
        io.emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
}