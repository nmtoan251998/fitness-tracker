const Router = require('express').Router();

const {
    testController,
} = require('../controllers/test.controller');

const {
    sayHelloMiddleware,    
} = require('../middlewares/test.middleware');

/**
* @api {get} /test
* @apiDescription Test APIs
* @apiName Test
* @apiGroup Test
* @apiPermission Public
*
* @apiParam {Type} name - Description
*
* @apiSuccess (OK 200){String} msg - Description
*
* @apiError (StatusMessage StatusCode) {Type} name - Successfully get /test endpoint
*/
Router.route('')
    .get(
        sayHelloMiddleware,
        testController
    );

module.exports = Router;