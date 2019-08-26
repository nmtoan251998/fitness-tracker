const Router = require('express').Router();

const testRoutes = require('./test.route');

/**
 * Routes
 */
Router.use('/test', testRoutes);

module.exports = Router;