const httpStatus = require('http-status');

module.exports.notFound = (req, res, next) => {
    return res.status(httpStatus.OK).redirect('/404');
}

module.exports.errorHandler = (error, req, res, next) => {    
    return res.json(error).end();
}