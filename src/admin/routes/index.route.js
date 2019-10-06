const Router = require('express').Router();

const homeRoutes = require('./api/home.route');

Router.use('/admin', homeRoutes);

module.exports = Router;