const httpStatus = require('http-status');

const {
    APIError    
} = require('../utils/APIErrors');

module.exports.notFound = (req, res, next) => {
    const error = new APIError('Not Found', httpStatus.NOT_FOUND);
    return res.json(error).end();
};

module.exports.errorHandler = (error, req, res, next) => {    
    return res.json(error).end();
};