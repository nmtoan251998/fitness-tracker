const mongoose = require('mongoose');

const {
    env,
    db
} = require('./vars'); // env variables

const uri = db.uri || 'mongodb+srv://admin:hbiit5XY8geJer7C@cluster0-6lu0f.mongodb.net/test?retryWrites=true&w=majority';

// mongoose configuration options
const mongooseOpts = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true,
    useUnifiedTopology: true,
}

mongoose.connection.on('error', error => {
    console.log(`MongoDb connection error: ${error}`);
    process.exit();
})

/**
 * Set debug mode on dev only
 */
if(env === 'development') {
    mongoose.set('debug', true);
}

module.exports.connect = () => {
    mongoose.connect(uri, mongooseOpts);
    console.log(`MongoDb connection established`);

    return mongoose.connection;
}