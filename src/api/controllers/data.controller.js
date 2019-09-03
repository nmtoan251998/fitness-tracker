const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const httpStatus = require('http-status');
const path = require('path');

module.exports.liveData = async (req, res, next) => {
    try {
        const { 
            heart_rate,
            steps,
            fat_gramms,
            meters,
            callories,
        } = req.body;
        
        const pathToFileContainer = path.join(__dirname, '../../assets/data/');
        const data = `${new Date()} \n ${JSON.stringify(req.body)} \n`;
        try {
            fs.appendFile(pathToFileContainer + 'result1.txt', data);
            await fs.writeFile(pathToFileContainer + 'result.txt', JSON.stringify(req.body));
        } catch (error) {
            console.log(error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
        }

        return res.status(httpStatus.OK).end();
    } catch (error) {
        next(error)
    }
}