const Router = require('express').Router();

const authRoutes = require('./auth.route');
const bleRoutes = require('./api/ble.route');
const newsRoutes = require('./api/news.route');
const dataRoutes = require('./api/data.route');

Router.use('/auth', authRoutes);
Router.use('/api/ble', bleRoutes);
Router.use('/api/news', newsRoutes);
Router.use('/api/data', dataRoutes);

module.exports = Router;