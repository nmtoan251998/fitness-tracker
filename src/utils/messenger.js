const Nexmo = require('nexmo');

const {
    sms
} = require('../config/vars');

const nexmo = new Nexmo({
    apiKey: sms.apiKey,
    apiSecret: sms.apiSecret,
});

/**
 * Send message to user phone whenever heart rate is over the safety level
 * 
 * @param {String} from - Sender phone number
 *                      Cannot modify the sender phone number in trial version
 * @param {String} to - Receiver phone number
 * @param {String} text - SMS content
 * 
 * @return {Promise<Function>}
 */
module.exports.sendWarningMsg = ({ from, to, text }) => {
    return new Promise((resolve, reject) => {
        nexmo.message.sendSms(
            from, 
            to, 
            text, 
            { type: 'unicode' },
            (error, response) => {
                if (error) throw new APIError('Error sending warning message to client');
                const remainingBalance = response.messages[0]['remaining-balance'];
                const messagePrice = response.messages[0]['message-price'];
                resolve({ from, to, text, remainingBalance, messagePrice });
            }
        );
    })    
}