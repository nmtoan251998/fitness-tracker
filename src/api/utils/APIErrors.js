const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ApplicationError extends Error {
    constructor({
        message,
        status,
        stack,
        errors
    }) {
        super();

        Error.captureStackTrace(this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.stack = stack;
        this.errors = errors;
    }
}

/**
 * Class representing an API error
 * @extends ApplicationError
 */

class APIError extends ApplicationError {
    /**
     * Creates an API error.
     * @param {String} message - Error message
     * @param {Number} status - HTTP status code of error
     */

    constructor({
        message = 'Opps, something went wrong...',
        status = httpStatus.INTERNAL_SERVER_ERROR,
        errors,
        stack
    }) {
        super({
            message,
            status,
            errors,
            stack
        });
    }
}

module.exports = APIError;