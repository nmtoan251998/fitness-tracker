// Socketio instance
const io = require('socket.io')();

io.on('connection', function(socket) {
    console.log('[ Socket.io ] User connected');
    
    socket.on('disconnect', function() {
        console.log('[ Socket.io ] User disconnected');
    });
});

module.exports = io;