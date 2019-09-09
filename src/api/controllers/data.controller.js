const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const httpStatus = require('http-status');
const path = require('path');
const { 
    spawn,
    spawnSync 
} = require('child_process');

const ASSETS_DATA_PATH = '../../assets/data';
const CONNECTED_ADD_FILE_NAME = 'MAC.txt';
const REALTIME_DATA_FILE_NAME = 'python_data.json';


module.exports.getIndexPage = (req, res, next) => {
    try {
        return res.status(httpStatus.OK).sendFile(path.join(__dirname, '../../../dist/home.html'));
    } catch (error) {
        next(error);
    }
}

module.exports.sendRealtimeData = (req, res, next) => {
    try {    
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
        // const pathToMACFile = path.join(__dirname, `${ASSETS_DATA_PATH}/${CONNECTED_ADD_FILE_NAME}`);
        const pathToMACFile = path.join(__dirname, ASSETS_DATA_PATH, CONNECTED_ADD_FILE_NAME);
        // execute Shellscript within 1s timeout
        const child = spawnSync(
            'timeout', 
            ['1', 'bluetoothctl' ,'>' , pathToMACFile], 
            { shell: true }
        );        
        
        /**
         * child process return codes:
         * 0: OK
         * !0 : Error
         */
        if (child.status !== 0) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Error getting connection history' }).end();
        }
                
        const addresses = await fs.readFileAsync(pathToMACFile, 'utf-8').then(data => data);
        /**
         * MAC addresses pattern
         * Device 9C:5C:F9:19:A5:DB MI Band2
         * Device EC:79:71:75:7E:8F XPeriaZ
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
        const mibandMACAddPattern = new RegExp(/(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2} MI Band 2)/g);
        
        if (!mibandMACAddPattern.test(req.query.add)) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid MI Band 2 MAC address' }).end();
        }

        // get the address like this xx:xx:xx:xx:xx:xx MI Band 2
        // then slice the MI Band 2 out of the result
        // expected result = xx:xx:xx:xx:xx:xx (MAC address)
        const address = req.query.add.toString().slice(0, 17);

        const child = spawn(
            'python3', 
            ['sendall.py', '--live', `--mac ${address}`], 
            {
                shell: true,
                cwd: path.join(__dirname, '../../utils/miband2')
            }
        );
        
        // because the child_process is infinite request, we need to end req-res lifecycle in the first time
        // prevent the header is sent again
        let isRequestEnded = false;
        child.on('exit', (code) => {
            /**
             * code values:
             * 0: child process executed successfully
             * 1: child process executed failed because of an uncaught error
             *  - Failed case: No addresses found
             *  - Failed case: Unknown error
             * 2: child process executed failed because of a bad request
             *  - Failed case: Wrong starting script
             */            
            if (code === 1 && !isRequestEnded) {
                isRequestEnded = true;
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err: 'Error starting python script' }).end();
            }

            if (code === 2 && !isRequestEnded) {
                isRequestEnded = true;
                return res.status(httpStatus.BAD_REQUEST).json({ err: 'Failed to start python script' }).end();
            }
            console.log(`child process exit with code: ${code}`);
        });

        child.on('close', (code) => {
            console.log(`child process close with code: ${code}`);
        });

        child.on('error', (error) => {
            if (!isRequestEnded) {
                isRequestEnded = true;
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err: 'Error starting python client script' }).end();
            }            
        });
        
        child.stdout.on('data', (data) => {            
            if (!isRequestEnded) {
                isRequestEnded = true;
                return res.status(httpStatus.OK).json({ msg: 'Successful to start python client script' }).end();
            }

            console.log(`child process stdout: ${data}`);
        });                           
    } catch (error) {
        next(error);
    }
}