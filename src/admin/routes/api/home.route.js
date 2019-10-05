const Router = require('express').Router();

const {
    adminPage
} = require('../../controllers/home.controller');

Router.route('').get(adminPage);

module.exports = Router;