const Promise = require('bluebird');
const fs = require('fs');
const httpStatus = require('http-status');
const path = require('path');

module.exports.getRealtimeData = async (req, res, next) => {
    try {
        const pathToFileContainer = path.join(__dirname, '../../assets/data/');
        const data = `${new Date()} \n ${JSON.stringify(req.body)} \n`;

        const writeFileResult = await Promise.all([
            fs.writeFile(pathToFileContainer + 'result.txt', JSON.stringify(req.body)),
            fs.appendFile(pathToFileContainer + 'result1.txt', data)
        ])

        if (!writeFileResult.length) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
        }

        return res.status(httpStatus.OK).json({ msg: 'Realtime data transfered' }).end();
    } catch (error) {
        next(error)
    }
}

module.exports.sendRealtimeData = (req, res, next) => {
    try {    
        const socket = res.io.sockets.connected[req.query.socketID];
        if (socket) {
            const interval = setInterval(async () => {
                try {
                    const pathToFile = path.join(__dirname, '../../assets/data/result.txt');

                    const fileContent = await fs.readFileAsync(pathToFile, 'utf-8').then(data => data);
                    socket.emit('result', fileContent);
                } catch (error) {
                    return next(error);
                }                
            }, 1000);
        }        

        return res.sendFile(path.join(__dirname, '../../../dist/home.html'));
    } catch (error) {
        next(error);
    }
}