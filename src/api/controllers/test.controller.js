const httpStatus = require('http-status');
const path = require('path');

module.exports.testController = (req, res, next) => {
    try {
        return res
            .status(httpStatus.OK)
            .json({ msg: 'Successfully get /test endpoint' })
            .end();
    } catch (error) {
        next(error);
    }
}