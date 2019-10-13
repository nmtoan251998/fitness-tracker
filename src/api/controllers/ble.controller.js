const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const httpStatus = require('http-status');
const path = require('path');
const {
    spawn,
    spawnSync
} = require('child_process');

const DeviceDataModel = require('../models/deviceData.model');
const UserModel = require('../models/user.model');
const ASSETS_DATA_PATH = '../../assets/data';

/**
 * Convert buffer data to object returned by throwing a child process to start python script
 * 
 * @param {*} realtimeDataString  
 * 
 * @return {Number} heart_rate - realtime heart rate
 * @return {Number} steps - realtime steps
 * @return {Number} fat_gramms - realtime fat gram
 * @return {Number} meters - realtime meters
 * @return {Number} callories - realtime callories
 * @return {Number} battery_level - realtime battery level
 * @return {String} time - realtime current time
 * @return {String} battery_status - realtime battery status
 * 
 * @private
 */
const formatRealtimeData = (realtimeDataString) => {
    const heartRatePattern = /'heart_rate': \w+/;
    const stepsPattern = /'steps': \w+/;
    const fatGramPattern = /'fat_gramms': \w+/;
    const metersPattern = /'meters': \w+/;
    const calloriesPattern = /'callories': \w+/;
    const timePattern = /'time': \d+/;
    const batteryLevelPattern = /'battery_level': \w+/;
    const batteryStatusPattern = /'battery_status': '\w+'/;

    const heartRateString = realtimeDataString.match(heartRatePattern)[0];
    const stepsString = realtimeDataString.match(stepsPattern)[0];
    const fatGramString = realtimeDataString.match(fatGramPattern)[0];
    const metersString = realtimeDataString.match(metersPattern)[0];
    const calloriesString = realtimeDataString.match(calloriesPattern)[0];

    const timeString = realtimeDataString.match(timePattern)[0];
    const batteryLevelString = realtimeDataString.match(batteryLevelPattern)[0];
    const batteryStatusString = realtimeDataString.match(batteryStatusPattern)[0];

    const heartRate = heartRateString.slice(heartRateString.indexOf(' ') + 1, heartRateString.length);
    const steps = stepsString.slice(stepsString.indexOf(' ') + 1, stepsString.length);
    const fatGram = fatGramString.slice(fatGramString.indexOf(' ') + 1, fatGramString.length);
    const meters = metersString.slice(metersString.indexOf(' ') + 1, metersString.length);
    const callories = calloriesString.slice(calloriesString.indexOf(' ') + 1, calloriesString.length);
    const time = timeString.slice(timeString.indexOf(' ') + 1, timeString.length);
    const batteryLevel = batteryLevelString.slice(batteryLevelString.indexOf(' ') + 1, batteryLevelString.length);
    const batteryStatus = batteryStatusString.slice(batteryStatusString.indexOf(' ') + 2, batteryStatusString.length - 1);

    return {
        heart_rate: parseInt(heartRate),
        steps: parseInt(steps),
        fat_gramms: parseInt(fatGram),
        meters: parseInt(meters),
        callories: parseInt(callories),
        time: parseInt(time),
        battery_level: parseInt(batteryLevel),
        battery_status: batteryStatus
    }
}

const updateDeviceConnection = async (address) => {
    try {
        const DEVICE_DATA_FILE_NAME = `${address}_device_data.json`;
        const pathToFile = path.join(__dirname, ASSETS_DATA_PATH, '/', DEVICE_DATA_FILE_NAME);

        const fileContent = await fs.readFileAsync(pathToFile, 'utf-8').then(data => JSON.parse(data));

        const jwt = req.cookies.jwt;
        const currentUser = await UserModel.verifyJwt(jwt);
        console.log({currentUser});
        // const existDeviceData = await DeviceDataModel.findByMacAdd(fileContent.mac);

        // if (!existDeviceData) {
        //     const newDeviceData = new DeviceDataModel({
        //         macAdd: fileContent.mac,
        //         serial: fileContent.serial,
        //         softwareRevision: fileContent.software_revision,
        //         hardwareRevision: fileContent.hardware_revision,
        //         connectionTime: [fileContent.connection_time]
        //     });

        //     saveFileResult = await newDeviceData.save();
        // } else {
        //     const newDeviceData = {
        //         macAdd: existDeviceData.macAdd,
        //         serial: existDeviceData.serial,
        //         softwareRevision: existDeviceData.softwareRevision,
        //         hardwareRevision: existDeviceData.hardwareRevision,
        //         connectionTime: [...existDeviceData.connectionTime, fileContent.connection_time]
        //     };

        //     saveFileResult = await DeviceDataModel.findOneAndUpdate({
        //         macAdd: fileContent.mac
        //     }, newDeviceData);
        // }
        // await fs.unlink(pathToFile);

        // return true;
    } catch (error) {
        return false;
    }
}

module.exports.getConnectedAdds = async (req, res, next) => {
    try {
        const MAC_ADDS_FILE_NAME = 'MAC.txt';
        const pathToMACFile = path.join(__dirname, ASSETS_DATA_PATH, MAC_ADDS_FILE_NAME);

        // execute Shellscript within 1s timeout
        const child = spawnSync(
            'timeout',
            ['1', 'bluetoothctl', '>', pathToMACFile], {
                shell: true
            }
        );

        const addresses = await fs.readFileAsync(pathToMACFile, 'utf-8').then(data => data);
        /**
         * MAC addresses pattern
         * 9C:5C:F9:19:A5:DB MI Band2
         * EC:79:71:75:7E:8F XPeriaZ
         */
        const MACAddPattern = /(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2}) [^\n]+/g;
        const MACAdd = addresses.toString().match(MACAddPattern);
        return res.status(httpStatus.OK).json({
            addresses: MACAdd
        }).end();
    } catch (error) {
        next(error);
    }
}

module.exports.startPython = async (req, res, next) => {
    try {
        // get connected socket appended by a global middleware
        const socket = res.io.sockets.connected[req.query.socketID];

        const mibandMACAddPattern = new RegExp(/(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})/g);
        if (!mibandMACAddPattern.test(req.query.add)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg: 'Invalid MI Band 2 MAC address'
            }).end();
        }

        // get the address like this xx:xx:xx:xx:xx:xx
        // then slice the MI Band 2 out of the result
        // expected result = xx:xx:xx:xx:xx:xx (MAC address)
        const address = req.query.add;
        
        const spawnCommand = (req.cookies.jwt) ?
            ['sendall.py', '--live', '--diagnose', `--mac ${address}`] :
            ['sendall.py', '--live', `--mac ${address}`];
            
        const child = spawn(
            'python3',
            spawnCommand, {
                detached: true,
                shell: true,
                cwd: path.join(__dirname, '../../lib/miband2')
            }
        );

        socket.on('disconnect', () => {
            process.kill(-child.pid);
        });

        // because the child_process is infinite request, we need to end req-res lifecycle in the first time
        // prevent the header is sent again
        let isRequestSentOnce = false;
        child.on('exit', (code, signal) => {
            if (code === 1 && !isRequestSentOnce) {
                isRequestSentOnce = true;
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        err: 'Error starting python script'
                    })
                    .end();
            }

            socket.emit('exit-process', 'meomeo');
        });

        child.on('error', (error) => {
            if (!isRequestSentOnce) {
                isRequestSentOnce = true;
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                        err: 'Error communicating with BLE device'
                    })
                    .end();
            }

            socket.emit('exit-process', 'meomeo');
        });

        child.stdout.on('data', async (data) => {
            if (!isRequestSentOnce) {
                await updateDeviceConnection(address);

                isRequestSentOnce = true;

                return res
                    .status(httpStatus.OK)
                    .json({
                        msg: 'Successful to start python and save device data'
                    })
                    .end();
            }

            socket.emit('result', formatRealtimeData(data.toString()));
        });

    } catch (error) {
        next(error);
    }
}

module.exports.deviceData = async (req, res, next) => {
    try {
        const macAdd = req.params.mac;        

        const data = await DeviceDataModel.findByMacAdd(macAdd);

        return res.status(httpStatus.OK).json(data).end();
    } catch (error) {
        next(error);
    }
}