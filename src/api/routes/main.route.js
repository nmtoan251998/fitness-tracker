const Router = require('express').Router();
const passport = require('passport');

const {
    homePage,
    blePage,
    newsPage,
    fagPage,
    notFoundPage,
    unauthorizedPage,
    forbiddenPage,
} = require('../controllers/main.controller');

const {
    getQueryToken
} = require('../middlewares/auth.middleware');

/**
 * Render home page
 * @api {get} /
 * @public
 */
Router.route('/').get(homePage);

/**
 * Render news page
 * @api {get} /news
 * @private
 */
Router.route('/news')
    .get(getQueryToken,
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/401'
    }),newsPage);    
/**
 * Render ble page
 * @api {get} /ble
 * @public
 */
Router.route('/ble').get(blePage);

/**
 * Render fag page
 * @api {get} /fag
 * @public
 */
Router.route('/fag').get(fagPage);

/**
 * Render not found page
 * @api {get} /404
 * @public
 */
Router.route('/404').get(notFoundPage);

/**
 * Render unauthorized page
 * @api {get} /401
 * @public
 */
Router.route('/401').get(unauthorizedPage);

/**
 * Render forbidden page
 * @api {get} /403
 * @public
 */
Router.route('/403').get(forbiddenPage);

module.exports = Router;