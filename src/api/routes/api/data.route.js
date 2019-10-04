const Router = require('express').Router();

const {
    sendWarningSMS,
    sendWarningMail,
} = require('../../controllers/data.controller');

/**
* @api {post} /api/data/warning/sms
* @apiDescription Send message to user whenever heart rate is out of the safety level
* @apiGroup Data
* @apiPermission Public
*
* @apiSuccess (StatusMessage StatusCode) {Type} name - Description
*
* @apiError (StatusMessage StatusCode) {Type} name - Description
*/
Router.route('/warning/sms').post(sendWarningSMS);

/**
* @api {post} /api/data/warning/mail
* @apiDescription Send mail to user whenever heart rate is out of the safety level
* @apiGroup Data
* @apiPermission Public
*
* @apiSuccess (StatusMessage StatusCode) {Type} name - Description
*
* @apiError (StatusMessage StatusCode) {Type} name - Description
*/
Router.route('/warning/mail').post(sendWarningMail);

module.exports = Router;