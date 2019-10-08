const Router = require('express').Router();

const {
    signup,
    signin,
} = require('../controllers/auth.controller');

const {
    validateSignUpInput,
    validateSignInInput
} = require('../validation/auth.validation');

/**
* @api {post} /auth/signup
* @apiDescription Create new user account
* @apiGroup Auth
* @apiPermission Public
*
* @apiParam {String} email - User email
* @apiParam {String} name - User name
* @apiParam {String} password - User password
* @apiParam {String} phone - User phone
* @apiParam {Number} age - User age
* @apiParam {String} gender - User gender
*
* @apiSuccess (Created 201) {ObjectId} _id
* @apiSuccess (Created 201) {String} email
* @apiSuccess (Created 201) {String} password
* @apiSuccess (Created 201) {String} name
* @apiSuccess (Created 201) {String} phone
* @apiSuccess (Created 201) {String} gender
* @apiSuccess (Created 201) {Number} age
* @apiSuccess (Created 201) {Date} createdAt
* @apiSuccess (Created 201) {Date} updatedAt
*
* @apiError (Bad Request 400) {String} msg - This email is already taken
*
* @apiError (Unprocessable Entity 422) {Array<Object>} {].value - Error value
* @apiError (Unprocessable Entity 422) {Array<Object>} {].msg - Error message
* @apiError (Unprocessable Entity 422) {Array<Object>} {].param - Error parameter
* @apiError (Unprocessable Entity 422) {Array<Object>} {].location - Error location
*/
Router.route('/signup').post(validateSignUpInput, signup);

/**
* @api {post} /auth/signin
* @apiDescription Log in user account
* @apiGroup Auth
* @apiPermission Public
*
* @apiParam {String} email - User email
* @apiParam {String} password - User password
*
* @apiSuccess (OK 200) {ObjectId} user._id
* @apiSuccess (OK 200) {String} user.email
* @apiSuccess (OK 200) {String} user.password
* @apiSuccess (OK 200) {String} user.name
* @apiSuccess (OK 200) {String} user.gender
* @apiSuccess (OK 200) {String} user.phone
* @apiSuccess (OK 200) {Number} user.age
* @apiSuccess (OK 200) {Date} user.createdAt
* @apiSuccess (OK 200) {Date} user.updatedAt
* @apiSuccess (OK 200) {String} token - Bearer json web token
*
* @apiError (Bad Request 400) {String} name - APIError
* @apiError (Bad Request 400) {String} message - Error description
* @apiError (Bad Request 400) {Number} status - Error status code
*
* @apiError (Unprocessable Entity 422) {Array<Object>} {}.value - Error value
* @apiError (Unprocessable Entity 422) {Array<Object>} {}.msg - Error message
* @apiError (Unprocessable Entity 422) {Array<Object>} {}.param - Error parameter
* @apiError (Unprocessable Entity 422) {Array<Object>} {}.location - Error location
*/
Router.route('/signin').post(validateSignInInput, signin);

module.exports = Router;