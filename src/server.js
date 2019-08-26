const app = require('./config/express');

const {
    port,
    env
} = require('./config/vars');

app.listen(port, () => console.log(`Server is started on port: ${port} (${env})`));

/**
 * App instance - For testing purposes
 * @public
 */
module.exports = app;