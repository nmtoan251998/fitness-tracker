const httpStatus = require('http-status');

class ApplicationError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}

class APIError extends ApplicationError {
    constructor(message, status) {
        super(
            message || 'Opps, something went wrong...', 
            status || httpStatus.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    APIError
};