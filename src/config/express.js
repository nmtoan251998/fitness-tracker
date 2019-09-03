/**
 * Dependencies requirements
 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');

/**
 * Server instances requirements
 */
const {
    log
} = require(path.join(__dirname, './vars'));

// Express instance
const Router = require(path.join(__dirname, '../api/routes/index.route'));
const app = express();
const io = require('./socketio');

/**
 * Use middlewares
 */
// serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

// middleware to receive data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log all api call to console
app.use(morgan(log));

// enable CORS in headers
app.use(cors());

// use Http request such as PUT, DELETE
app.use(methodOverride());

// append socketio instance to every server response
app.use(function(req, res, next) {
    res.io = io;
    next();
});

// Router
app.use(Router);

/**
 * Express instance
 * @public
 */
module.exports = {
    app,
    io,
};