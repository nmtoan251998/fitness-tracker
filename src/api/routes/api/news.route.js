const Router = require('express').Router();

const {
    crawlData,
    saveCrawlData,
    newsHealthPosts,
    getByDate
} = require('../../controllers/news.controller');

/**
 * @api {get} /api/news
 * @apiDescription Get news health posts crawled
 * @apiGroup News
 * @apiPermission Public
 *
 * @apiSuccess (OK 200) {Object[]} href - Link to the original post
 * @apiSuccess (OK 200) {Object[]} title - Title of the post
 * @apiSuccess (OK 200) {Object[]} src - Thumbnail of post
 * @apiSuccess (OK 200) {Object[]} alt - Alternative link of thumbnail
 *
 * @apiError (Not Found 404) {String} msg - Crawl more data
 *
 * @apiError (Internal Server Error 500) {String} msg - Error getting cached crawled data
 */
Router.route('').get(newsHealthPosts);

/**
 * @api {post} /api/news/crawl
 * @apiDescription Crawl data from baomoi.com for healthy news posts
 * @apiGroup News
 * @apiPermission Public
 *
 * @apiSuccess (OK 200) {Object[]} href - Link to the original post
 * @apiSuccess (OK 200) {Object[]} title - Title of the post
 * @apiSuccess (OK 200) {Object[]} src - Thumbnail of post
 * @apiSuccess (OK 200) {Object[]} alt - Alternative link of thumbnail
 *
 * @apiError (INTERNAL_SERVER_ERROR 500) {String} error.msg - Exceed Timeout
 */
Router.route('/crawl').post(crawlData);

/**
 * @api {put} /api/news/crawl
 * @apiDescription Save crawled data to database
 * @apiGroup News
 * @apiPermission Public
 *
 * @apiSuccess (Created 201) {String} msg - Successfully update news health posts data
 * @apiSuccess (Created 201) {ObjectId} _id - Id of document
 * @apiSuccess (Created 201) {String} crawlerURI - Crawled site
 * @apiSuccess (Created 201) {String} crawlDate - Crawled date
 * @apiSuccess (Created 201) {Date} createdAt - Document created time
 * @apiSuccess (Created 201) {Date} updatedAt - Document last updated time
 * @apiSuccess (Created 201) {Object[]} href - Link to the original post
 * @apiSuccess (Created 201) {Object[]} title - Title of the post
 * @apiSuccess (Created 201) {Object[]} src - Thumbnail of post
 * @apiSuccess (Created 201) {Object[]} alt - Alternative link of thumbnail
 */
Router.route('/crawl').put(saveCrawlData);

/**
 * @api {get} /api/news/date?date
 * @apiDescription Get news health post by date
 * @apiGroup News
 * @apiPermission Public
 *
 * @apiParam {String {dd/mm/yyyy} } date - Date to get news health post
 *
 * @apiSuccess (OK 200) {String} date - date to get news health posts
 * @apiSuccess (OK 200) {Object[]} href - Link to the original post
 * @apiSuccess (OK 200) {Object[]} title - Title of the post
 * @apiSuccess (OK 200) {Object[]} src - Thumbnail of post
 * @apiSuccess (OK 200) {Object[]} alt - Alternative link of thumbnail
 */
Router.route('/date').get(getByDate);

module.exports = Router;