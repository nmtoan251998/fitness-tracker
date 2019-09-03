const Promise = require('bluebird');
const httpStatus = require('http-status');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

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
            const interval = setInterval(async function() {
                try {
                    const pathToFile = path.join(__dirname, '../../assets/data/result.txt');

                    const fileContent = await fs.readFileAsync(pathToFile, 'utf-8').then(data => data);
                    return socket.emit('result', fileContent);
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

        sh.exec('node -v');

        sh.exec('sudo hcitool lescan');
    } catch (error) {
        next(error);
    }
}