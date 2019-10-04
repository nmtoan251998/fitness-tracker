const Router = require('express').Router();

const {
    crawlData,    
    saveCrawlData,
    newsHealthPosts,
    getByDate
} = require('../../controllers/news.controller');

/**
* @api {get} /api/news/crawl
* @apiDescription Crawl data from baomoi.com for healthy news posts
* @apiGroup News
* @apiPermission Public
*
* @apiSuccess (OK 200) {Array<Object>} ['href'] - Link to the original post
* @apiSuccess (OK 200) {Array<Object>} ['title'] - Title of the post
* @apiSuccess (OK 200) {Array<Object>} ['src'] - Thumbnail of post
* @apiSuccess (OK 200) {Array<Object>} ['alt'] - Alternative link of thumbnail
*
* @apiError (INTERNAL_SERVER_ERROR 500) {String} error.msg - Exceed Timeout
*/
Router.route('/crawl').get(crawlData);

/**
* @api {put} /api/news/crawl
* @apiDescription Save crawled data to database
* @apiGroup News
* @apiPermission Public
*
* @apiSuccess (OK 201) {ObjectId} _id - Id of document
* @apiSuccess (OK 201) {String} crawlerURI - Crawled site
* @apiSuccess (OK 201) {String} crawlDate - Crawled date
* @apiSuccess (OK 201) {Date} createdAt - Document created time
* @apiSuccess (OK 201) {Date} updatedAt - Document last updated time
* @apiSuccess (OK 201) {Array<Object>} ['href'] - Link to the original post
* @apiSuccess (OK 201) {Array<Object>} ['title'] - Title of the post
* @apiSuccess (OK 201) {Array<Object>} ['src'] - Thumbnail of post
* @apiSuccess (OK 201) {Array<Object>} ['alt'] - Alternative link of thumbnail
*/
Router.route('/crawl').put(saveCrawlData);

/**
* @api {get} /api/news/date?date
* @apiDescription Get news health post by date
* @apiGroup News
* @apiPermission Public
*
* @apiParam {String {dd/mm/yy} } date - Date to get news health post
*
* @apiSuccess {OK 200}
* @apiSuccess (OK 200) {String} date - date to get news health posts
* @apiSuccess (OK 200) {Array<Object>} ['href'] - Link to the original post
* @apiSuccess (OK 200) {Array<Object>} ['title'] - Title of the post
* @apiSuccess (OK 200) {Array<Object>} ['src'] - Thumbnail of post
* @apiSuccess (OK 200) {Array<Object>} ['alt'] - Alternative link of thumbnail
*
* @apiError (StatusMessage StatusCode) {Type} name - Description
*/
Router.route('/date').get(getByDate);

module.exports = Router;