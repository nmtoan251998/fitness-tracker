// Socketio instance
const io = require('socket.io')();

io.on('connection', (socket) => {
    console.log('[ Socket.io ] User connected');
    
    socket.on('disconnect', () => {
        console.log('[ Socket.io ] User disconnected');
    });    
});

module.exports = io;