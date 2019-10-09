const httpStatus = require('http-status');

module.exports.unauthorized = (req, res, next) => {
    return res.status(httpStatus.UNAUTHORIZED).redirect('/401');
}

module.exports.forbidden = (req, res, next) => {
    return res.status(httpStatus.FORBIDDEN).redirect('/403');
}

module.exports.notFound = (req, res, next) => {
    return res.status(httpStatus.NOT_FOUND).redirect('/404');
}

module.exports.errorHandler = (error, req, res, next) => {    
    return res.json(error).end();
}