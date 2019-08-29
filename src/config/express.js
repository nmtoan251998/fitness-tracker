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

const Router = require(path.join(__dirname, '../api/routes/index.route'));

// Express instance
const app = express();

/**
 * Use middlewares
 */
// middleware to receive data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// log all api call to console
app.use(morgan(log));

// enable CORS in headers
app.use(cors());

// use Http request such as PUT, DELETE
app.use(methodOverride());

// Router
app.use(Router);

/**
 * Express instance
 * @public
 */
module.exports = app;