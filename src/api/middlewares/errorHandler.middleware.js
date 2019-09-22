const httpStatus = require('http-status');

module.exports.errorNotFound = (req, res, next) => {
    const error = new Error('Not Found');
    error.status = httpStatus.NOT_FOUND;
    next(error);
};

module.exports.errorHandler = (error, req, res, next) => {
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR);

    return res.json({
        error: {
            msg: error.message
        }
    }).end();
};