const Router = require('express').Router();

const {
    avgData,
    sendWarningSMS,
    sendWarningMail,
} = require('../../controllers/data.controller');

Router.route('').get(avgData);

Router.route('/warning/sms').post(sendWarningSMS);

Router.route('/warning/mail').post(sendWarningMail);

module.exports = Router;