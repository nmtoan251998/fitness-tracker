const Promise = require('bluebird');
const httpStatus = require('http-status');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const { 
    spawn,
    spawnSync,    
} = require('child_process');

module.exports.testController = (req, res, next) => {
    try {
        return res
            .status(httpStatus.OK)
            .json({ msg: 'Successfully get /test endpoint' })
            .end();
    } catch (error) {
        next(error);
    }
}

module.exports.renderIndex = (req, res, next) => {
    try {    
        const socket = res.io.sockets.connected[req.query.socketID];
        if (socket) {
            const interval = setInterval(async () => {
                try {
                    const pathToFile = path.join(__dirname, '../../assets/data/python_data.txt');

                    const fileContent = await fs.readFileAsync(pathToFile, 'utf-8').then(data => data);
                    // socket.emit('result', fileContent);
                } catch (error) {
                    next(error);
                }
            }, 1000);
        }        

        return res.sendFile(path.join(__dirname, '../../../dist/home.html'));
    } catch (error) {
        next(error);
    }
}

module.exports.getMACaddresses = (req, res, next) => {
    try {
        const sh = require('shelljs');

        const filename = 'MAC.txt';
        const pathTofile = path.join(__dirname, `../../assets/data/${filename}`);
        const timeout = 1;

        /**
         * MAC addresses pattern
         * 9C:5C:F9:19:A5:DB
         * EC:79:71:75:7E:8F
         */
        const mibandMACAddPattern = /Device (([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2}) MI Band 2/g;

        sh.exec(`timeout ${timeout} bluetoothctl > ${pathTofile}`);

        return setTimeout(async () => {
            const addresses = await fs.readFileAsync(pathTofile, 'utf-8').then(data => data);                                    
            const MIBAND_ADD = addresses.toString().match(mibandMACAddPattern);

            return res.status(httpStatus.OK).json({ MIBAND_ADD }).end();
        }, timeout)        
    } catch (error) {
        next(error);
    }
}

module.exports.startPython = async (req, res, next) => {
    try {
        const sh = require('shelljs');

        const filename = 'MAC.txt';
        const pathTofile = path.join(__dirname, `../../assets/data/${filename}`);
        const mibandMACAddPattern = /(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2} MI Band 2)/g;

        const addresses = await fs.readFileAsync(pathTofile, 'utf-8').then(data => data);                                    
        const MIBAND_ADD = addresses.toString().match(mibandMACAddPattern)[0].slice(0, 17);        

        const pathToRunFile = path.join(__dirname, `../../utils/miband2`);
        const pythonScript = `cd ${pathToRunFile} && python3 sendall.py --live --mac ${MIBAND_ADD}`;        

        sh.exec(pythonScript);

        return res.status(httpStatus.OK).json({ msg: 'Executed' });
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

        const child = spawn(
            'python3', 
            ['hello.py'], 
            {
                detached: true,
                shell: true,
                // stdio: 'ignore',
                cwd: path.join(__dirname, '../../utils/miband2')
            }
        );        
        
        // because the child_process is infinite request, we need to end req-res lifecycle in the first time
        // prevent the header is sent again
        let isRequestEnded = false;
        child.on('exit', (code, signal) => {
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

        child.on('message', (msg) => {
            console.log(msg);
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