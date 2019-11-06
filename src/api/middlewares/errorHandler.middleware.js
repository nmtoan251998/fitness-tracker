const httpStatus = require('http-status');
const {
    env
} = require('../../config/vars.js');
const APIError = require('../utils/APIErrors');

module.exports.unauthorized = (req, res, next) => {    
    return res.status(httpStatus.UNAUTHORIZED).redirect('/401');        
}

module.exports.forbidden = (req, res, next) => {
    if (env === 'production') {
        return res.status(httpStatus.FORBIDDEN).redirect('/403');
    }

    throw new APIError({
        message: 'Forbidden',
        status: httpStatus.FORBIDDEN
    });
}

module.exports.notFound = (req, res, next) => {
    if (env === 'production') {
        return res.status(httpStatus.NOT_FOUND).redirect('/404');
    }

    throw new APIError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND
    });
}

module.exports.errorHandler = (error, req, res, next) => {
  //  return res.status(error.status).json(error).end();
}