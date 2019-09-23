const {
    app,
    io,
} = require('./config/express');

const {
    port,
    env
} = require('./config/vars');

const server = require('http').createServer(app);
io.attach(server);

// connect to mongodb
require('./config/mongoose').connect();

server.listen(port, () => console.log(`Server is started on port: ${port} (${env})`));

/**
 * App instance - For testing purposes
 * @public
 */
module.exports = {
    app,
    server,
};