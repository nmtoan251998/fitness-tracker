const Router = require('express').Router();

const {
    homePage,
    blePage,
    newsPage,
    notFoundPage,
} = require('../controllers/main.controller');

/**
 * Render home page
 * @public
 */
Router.route('/').get(homePage);

/**
 * Render news page
 * @public
 */
Router.route('/news').get(newsPage);

/**
 * Render ble page
 * @public
 */
Router.route('/ble').get(blePage);

/**
 * Render not found page
 * @public
 */
Router.route('/404').get(notFoundPage);

module.exports = Router;