const Router = require('express').Router();

const {    
    getIndexPage,
    getConnectedAdds,
    startPython,
    deviceData,
} = require('../../controllers/ble.controller');

/**
* @api {get} /api/ble
* @apiDescription Render home page
* @apiName Render home page
* @apiGroup Data
* @apiPermission Public
*
* @apiSuccess (OK 200) {.html} - Render file home.html
*
* @apiError (Not Found 404) - No such file or directory. Wrong file path.
*/
Router.route('').get(getIndexPage);

/**
* @api {get} /api/ble/mac
* @apiDescription Get MAC address by spawning a shell command 'bluetoothctl'
* @apiName MAC Addresses
* @apiGroup BLE
* @apiPermission Public
*
* @apiSuccess (OK 200) {[<String>]} addresses - MAC addresses received by spawning shell command
*/
Router.route('/mac').get(getConnectedAdds);

/**
* @api {get} /api/ble/start-python
* @apiDescription Start python script
* @apiName Start python
* @apiGroup BLE
* @apiPermission Public
*
* @apiSuccess (OK 200) {String} msg - Successful to start python and save device data
*
* @apiError (Bad Request 400) msg - Invalid MI Band 2 MAC address
* @apiError (Internal  Server Error 500) err - Error starting python client script
*
* @apiError (ERR_CONNECTION_REFUSED ) err - Error when connection between server and BLE is down
*/
Router.route('/start-python').get(startPython)

/**
* @api {get} /api/ble/device/:mac
* @apiDescription Get device data with MAC address
* @apiGroup BLE
* @apiPermission Public
*
* @apiParam {String} mac - MAC address to get device data
*
* @apiSuccess (OK 200) {String<ObjectId>} result._id - MongoDb object id
* @apiSuccess (OK 200) {String} result.macAdd - Connecting MAC address of BLE
* @apiSuccess (OK 200) {String} result.serial - Connecting serial of BLE
* @apiSuccess (OK 200) {[String]} result.connectionTime - Connection time of connecting BLE device
* @apiSuccess (OK 200) {String} result.softwareRevision - Connecting software revision of BLE
* @apiSuccess (OK 200) {String} result.hardwareRevision - Connecting hardware revision of BLE
* @apiSuccess (OK 200) {Date} result.createdAt - Created time of data
* @apiSuccess (OK 200) {Date} result.updatedAt - Last updated time of data
*
* @apiError (StatusMessage StatusCode) {Type} name - Description
*/
Router.route('/device/:mac').get(deviceData)

module.exports = Router;