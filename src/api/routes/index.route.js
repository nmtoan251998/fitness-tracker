const Router = require('express').Router();

const testRoutes = require('./test.route');
const bleRoutes = require('./ble.route');
const newsRoutes = require('./news.route');

Router.use('/test', testRoutes);
Router.use('/ble', bleRoutes);
Router.use('/news', newsRoutes);

module.exports = Router;