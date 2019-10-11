/**
 * Dependencies requirements
 */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');

/**
 * Server instances requirements
 */
const { log, secretKey } = require(path.join(__dirname, './vars')); 

// utils pages
const {
    notFound,
    unauthorized,
    forbidden,
    errorHandler
} = require('../api/middlewares/errorHandler.middleware');

// Express instances
const Router = require(path.join(__dirname, '../api/routes/index.route'));
const adminRouter = require(path.join(__dirname, '../admin/routes/index.route'));
const app = express();
const io = require('./socketio');

// serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

/**
 * Use middlewares
 */

// middleware to receive data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie for the req-res
app.use(cookieParser(secretKey.value));

// log all api call to console
app.use(morgan(log));

// enable CORS in headers
app.use(cors());

// use Http request such as PUT, DELETE
app.use(methodOverride());

// OAuth provider
app.use(passport.initialize());

require('./passport')(passport);

// append socketio instance to every server response
app.use(function(req, res, next) {
    res.io = io;
    next();
});

// Router
app.use(Router);
app.use(adminRouter);

// Global errors handler
app.use(notFound);
app.use(forbidden);
app.use(unauthorized);
app.use(errorHandler);

/**
 * Express instance
 * @public
 */
module.exports = {
    app,
    io,
};