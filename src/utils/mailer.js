const nodemailer = require('nodemailer');

/**
 * Send mail to user whenever heart rate is over the safety level
 * 
 * @param {String} from - Mail sender
 * @param {String} to - Mail receiver
 * @param {String} subject - Title of the mail
 * @param {String} msg - Mail content
 * 
 * @return {Promise<Function>}
 */
module.exports.mailer = async ({ from, to, subject, msg }) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    return await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: msg, // plain text body
        html: '<b>' + msg + '</b>' // html body
    });
}

