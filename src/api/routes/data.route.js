const Router = require('express').Router();

const {    
    getIndexPage,
    sendRealtimeData,
    getConnectedAdds,
    startPython,
} = require('../controllers/data.controller');

/**
* @api {get} /data
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

/**
* @api {get} /data/mac
* @apiDescription Get MAC address by spawning a shell command 'bluetoothctl'
* @apiName MAC Addresses
* @apiGroup Data
* @apiPermission Public
*
* @apiSuccess (OK 200) {[<String>]} addresses - MAC addresses received by spawning shell command
*/
Router.route('/mac').get(getConnectedAdds);

/**
* @api {get} /data/start-python
* @apiDescription Start python script 
*                       current: by command
*                       upgrade: by users clicking
* @apiName Start python
* @apiGroup Data
* @apiPermission Public
*
* @apiSuccess (OK 200) {String} msg - Executed
*/
Router.route('/start-python').get(startPython)

module.exports = Router;