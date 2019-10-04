const path = require('path');

// config env 
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    env: process.env.NODE_ENV,
    log: process.env.NODE_ENV === 'development' ? 'dev' : 'combined' ,
    port: process.env.PORT || 5000,
    db: {
        uri: process.env.DB_URI
    },
    reidsPort: process.env.REDIS_PORT,
    sms: {
        apiKey: process.env.SMS_API_KEY,
        apiSecret: process.env.SMS_API_SECRET
    },
    secretKey: process.env.APP_SECRET_KEY
};