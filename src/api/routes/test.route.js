const Router = require('express').Router();

const {
    testController,
    renderIndex,
    getMACaddresses,
    startPython,
} = require('../controllers/test.controller');

const {
    sayHelloMiddleware,    
} = require('../middlewares/test.middleware');

Router.route('')
    .get(
        sayHelloMiddleware,
        testController
    );

// Router.route('/home').get(renderIndex);

// Router.route('/mac').get(getMACaddresses);

// Router.route('/ble').get(startPython);

module.exports = Router;