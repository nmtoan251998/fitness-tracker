// Socketio instance
const io = require('socket.io')();

require('events').EventEmitter.defaultMaxListeners = 15;

io.on('connection', (socket) => {
    console.log('[ Socket.io ] User connected');
    
    socket.on('disconnect', () => {
        console.log('[ Socket.io ] User disconnected');
    });
});

module.exports = io;