const Router = require('express').Router();

const {
    liveData,
} = require('../controllers/data.controller');

/**
* @api {get} /data/live
* @apiDescription Receive reatime data from client (Xiaomi Miband2 device)
* @apiName Live data
* @apiGroup Data
* @apiPermission Public
*
* @apiParam {String} heart_rate - Heart rate data
* @apiParam {String} steps - Steps gone data
* @apiParam {String} fat_gramms - Fat gram data
* @apiParam {String} meters - Meters gone data
* @apiParam {String} callories - Callories consumption data
*
* @apiSuccess (OK 200){String} msg - Description
*/
Router.route('/live').post(liveData);

module.exports = Router;