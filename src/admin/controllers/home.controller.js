const httpStatus = require('http-status');
const path = require('path');

module.exports.adminPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/admin.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}