const Router = require('express').Router();

const {
    getRealtimeData,
    sendRealtimeData
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
* @apiParam {String} callories - Calories consumption data
*
* @apiSuccess (OK 200){String} msg - Realtime data transfered
*/
Router.route('/live').post(getRealtimeData);

/**
* @api {get} /data/socket
* @apiDescription Send data from realtime data read from file to browser
* @apiName Realtime data
* @apiGroup Data
* @apiPermission Public
*
* @apiSuccess (OK 200) - Render UI file to browser
*                       Create socket event name 'result' to communicate with the client socket
*/
Router.route('/socket').get(sendRealtimeData);

module.exports = Router;