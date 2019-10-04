const httpStatus = require('http-status');
const nodemailer = require('nodemailer');

const { mailer } = require('../../utils/mailer');
const { sendWarningMsg } = require('../../utils/messenger');

module.exports.sendWarningSMS = async (req, res, next) => {
    try {        
        const messageParams = {
            from: 'Fitness Tracker',
            to: '84967802598',
            text: 'Your heart rate is over the safety level'
        };

        const sendMsgResponse = await sendWarningMsg(messageParams);

        return res.status(httpStatus.OK).json(sendMsgResponse).end();
    } catch (error) {
        next(error);
    }
}

module.exports.sendWarningMail = async (req, res, next) => {
    try {
        const mailParams = {
            from: '"Fitness Tracker 😀😀" <fitnesstracker@example.com>', 
            to: 'toanb1605369@student.ctu.edu.vn', 
            subject: 'Hello',
            msg: 'Your heart rate is over the safety level'
        }
        // send mail with defined transport object
        const info = await mailer(mailParams);
        
        const previewURI = await nodemailer.getTestMessageUrl(info);

        return res.status(httpStatus.OK).json({ previewURI }).end();
    } catch (error) {
        next(error);
    }
}