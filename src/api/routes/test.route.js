const Router = require('express').Router();

const {
    testController,
    renderIndex,
    getMACaddresses,
} = require('../controllers/test.controller');

const {
    sayHelloMiddleware,    
} = require('../middlewares/test.middleware');

Router.route('')
    .get(
        sayHelloMiddleware,
        testController
    );

Router.route('/home').get(renderIndex);

Router.route('/mac').get(getMACaddresses);

module.exports = Router;