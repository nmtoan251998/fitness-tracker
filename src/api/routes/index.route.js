const Router = require('express').Router();

const testRoutes = require('./test.route');
const dataRoutes = require('./data.route');

Router.use('/test', testRoutes);
Router.use('/data', dataRoutes);

module.exports = Router;