const Router = require('express').Router();

const {
    homePage,
    blePage,
    newsPage,
    fagPage,
    notFoundPage,
} = require('../controllers/main.controller');

/**
 * Render home page
 * @api {get} /
 * @public
 */
Router.route('/').get(homePage);

/**
 * Render news page
 * @api {get} /news
 * @public
 */
Router.route('/news').get(newsPage);

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

module.exports = Router;