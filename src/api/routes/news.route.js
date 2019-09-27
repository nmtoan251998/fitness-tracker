const Router = require('express').Router();

const {
    crawlData,    
    saveCrawlData
} = require('../controllers/news.controller');

/**
* @api {get} /news/crawl
* @apiDescription Crawl data from baomoi.com for healthy news posts
* @apiGroup News
* @apiPermission Public
*
* @apiSuccess (OK 200) {Type} name - Description
*/
Router.route('/crawl').get(crawlData);

Router.route('/crawl').post(saveCrawlData);

module.exports = Router;