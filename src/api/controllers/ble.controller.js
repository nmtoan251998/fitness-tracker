const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const httpStatus = require('http-status');
const path = require('path');
const { 
    spawn,
    spawnSync,    
} = require('child_process');

const DeviceDataModel = require('../models/deviceData.model');

const ASSETS_DATA_PATH = '../../assets/data';

module.exports.getIndexPage = (req, res, next) => {
    try {
        return res.status(httpStatus.OK).sendFile(path.join(__dirname, '../../../dist/home.html'));
    } catch (error) {
        next(error);
    }
}

module.exports.sendRealtimeData = (req, res, next) => {    
    try {    
        const REALTIME_DATA_FILE_NAME = 'python_data.json';

        // get connected socket appended by a global middleware
        const socket = res.io.sockets.connected[req.query.socketID];
        
        if (!socket) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid socket id' }).end();
        }        
        
        const interval = setInterval(async () => {
            try {
                const pathToFile = path.join(__dirname, ASSETS_DATA_PATH, '/', REALTIME_DATA_FILE_NAME);

                const fileContent = await fs.readFileAsync(pathToFile, 'utf-8').then(data => JSON.parse(data));
                socket.emit('result', fileContent);
            } catch (error) {
                console.log(error);
                next();
            }
        }, 1000);         
    } catch (error) {
        next(error);
    }
}

module.exports.getConnectedAdds = async (req, res, next) => {
    try {
        const MAC_ADDS_FILE_NAME = 'MAC.txt';
        const pathToMACFile = path.join(__dirname, ASSETS_DATA_PATH, MAC_ADDS_FILE_NAME);

        // execute Shellscript within 1s timeout
        const child = spawnSync(
            'timeout', 
            ['1', 'bluetoothctl' ,'>' , pathToMACFile], 
            { shell: true }
        );
                
        const addresses = await fs.readFileAsync(pathToMACFile, 'utf-8').then(data => data);
        /**
         * MAC addresses pattern
         * 9C:5C:F9:19:A5:DB MI Band2
         * EC:79:71:75:7E:8F XPeriaZ
         */
        const MACAddPattern = /(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2}) [^\n]+/g;
        const MACAdd = addresses.toString().match(MACAddPattern);                                         
        return res.status(httpStatus.OK).json({ addresses: MACAdd }).end();
    } catch (error) {
        next(error);
    }
}

module.exports.startPython = async (req, res, next) => {
    try {   
        /**
         * FIXME:
         * @name ChildprocessExecution - When request is sent, server will send a child_process to start python script.
         *                              Error occured whenever request is canceled by the clients,
         *                              child_process is continuously executes without being terminated.
         * @name BLEConnection - Sometimes there will be an error while trying to establish connection.
         *                      Error occurred and without any reason, we need to reconnect
         */        
        const mibandMACAddPattern = new RegExp(/(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})/g);
        
        if (!mibandMACAddPattern.test(req.query.add)) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid MI Band 2 MAC address' }).end();
        }

        // get the address like this xx:xx:xx:xx:xx:xx
        // then slice the MI Band 2 out of the result
        // expected result = xx:xx:xx:xx:xx:xx (MAC address)
        const address = req.query.add;

        const child = spawn(
            'python3', 
            ['sendall.py', '--live', `--mac ${address}`], 
            {
                detached: true,
                shell: true,
                cwd: path.join(__dirname, '../../utils/miband2')
            }
        );        
        
        // because the child_process is infinite request, we need to end req-res lifecycle in the first time
        // prevent the header is sent again
        let isRequestSentOnce = false;
        child.on('exit', (code, signal) => {
            /**
             * code values:
             * 0: child process executed successfully
             * 1: child process executed failed because of an uncaught error
             *  - Failed case: No addresses found
             *  - Failed case: Unknown error
             *  - Failed case: Duplicate connection to BLE 
             */            
            if (code === 1 && !isRequestSentOnce) {
                isRequestSentOnce = true;
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ err: 'Error starting python script' })
                    .end();
            }

            console.log(`child process exit with code: ${code}`);
        });

        child.on('error', (error) => {
            if (!isRequestSentOnce) {
                isRequestSentOnce = true;
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ err: 'Error communicating with BLE device' })
                    .end();
            }
        });
        
        child.stdout.on('data', async (data) => {
            if (!isRequestSentOnce) {
                const DEVICE_DATA_FILE_NAME = `${address}_device_data.json`;
                const pathToFile = path.join(__dirname, ASSETS_DATA_PATH, '/', DEVICE_DATA_FILE_NAME);

                const fileContent = await fs.readFileAsync(pathToFile, 'utf-8').then(data => JSON.parse(data));

                const macAdd = fileContent.mac,
                    serial = fileContent.serial,
                    softwareRevision = fileContent.software_revision,
                    hardwareRevision = fileContent.hardware_revision,
                    connectionTime = fileContent.connection_time;
                                
                const existDeviceData = await DeviceDataModel.findByMacAdd(macAdd);

                if (!existDeviceData) {
                    const newDeviceData = new DeviceDataModel({
                        macAdd: macAdd,
                        serial: serial,
                        softwareRevision: softwareRevision,
                        hardwareRevision: hardwareRevision,
                        connectionTime: [connectionTime]
                    });

                    const result = await newDeviceData.save();

                    res
                        .status(httpStatus.OK)
                        .json({ 
                            result,
                            msg: 'Successful to start python and save device data' 
                        })
                        .end();
                } else {
                    const newDeviceData = {
                        macAdd: existDeviceData.macAdd,
                        serial: existDeviceData.serial,
                        softwareRevision: existDeviceData.softwareRevision,
                        hardwareRevision: existDeviceData.hardwareRevision,
                        connectionTime: [...existDeviceData.connectionTime, connectionTime]
                    };

                    const result = await DeviceDataModel
                                .findOneAndUpdate({ macAdd }, newDeviceData);

                    res
                        .status(httpStatus.OK)
                        .json({ 
                            result, 
                            msg: 'Successful to start python and save device data' 
                        })
                        .end();
                }
                
                return isRequestSentOnce = true;
            }
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