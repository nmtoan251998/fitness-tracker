const {
    check,
    validationResult
} = require('express-validator');
const httpStatus = require('http-status');

exports.validateSignUpInput = [
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email field is required')
    .bail()
    .isEmail()
    .withMessage('Wrong email format'),

    check('password')
    .not()
    .isEmpty()
    .withMessage('Password field is required')
    .bail()
    .isLength({
        min: 6,
        max: 128
    })
    .withMessage('Password field must be at least 6 characters and below 128 characters'),

    check('name')
    .isLength({
        max: 255
    })
    .withMessage('Name field cannot be below 255 characters'),

    check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone field is required')
    .bail()
    .isLength({
        max: 10
    })
    .withMessage('Phone field cannot be below 10 numbers'),

    check('age')
    .not()
    .isEmpty()
    .withMessage('Age field is required')
    .bail()
    .isDecimal()
    .withMessage('Age field must be an integer')
    .bail()
    .isInt({
        gt: 0
    })
    .withMessage('Age field must be greater than 0'),

    check('gender')
    .not()
    .isEmpty()
    .withMessage('Gender field is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY)
                .json(errors.array())
                .end();
        }

        return next();
    }
]

exports.validateSignInInput = [
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email field is required')
    .bail()
    .isEmail()
    .withMessage('Wrong email format'),

    check('password')
    .not()
    .isEmpty()
    .withMessage('Password field is required'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY)
                .json(errors.array())
                .end();
        }

        return next();
    }
]