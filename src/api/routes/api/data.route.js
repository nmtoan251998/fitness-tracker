const Router = require('express').Router();

const {
    sendWarningSMS,
    sendWarningMail,
} = require('../../controllers/data.controller');

/**
 * @api {get} /api/data/warning/sms
 * @apiDescription Send message to user whenever heart rate is out of the safety level
 * @apiGroup Data
 * @apiPermission Public
 *
 * @apiSuccess (OK 200) {String} msg - Successfully send message to user
 */
Router.route('/warning/sms').post(sendWarningSMS);

/**
 * @api {get} /api/data/warning/mail
 * @apiDescription Send mail to user whenever heart rate is out of the safety level
 * @apiGroup Data
 * @apiPermission Public
 *
 * @apiSuccess (OK 200) {String} msg - Successfully send mail to user
 * @apiSuccess (OK 200) {String} uri - RegExp(/https:/)
 */
Router.route('/warning/mail').post(sendWarningMail);

module.exports = Router;