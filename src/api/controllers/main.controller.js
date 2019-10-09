const path = require('path');
const httpStatus = require('http-status');

module.exports.homePage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/index.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.newsPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/news.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.blePage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/ble.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.fagPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/fag.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.notFoundPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/404.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.unauthorizedPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/401.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}

module.exports.forbiddenPage = (req, res, next) => {
    try {
        const pathToFile = path.join(__dirname, '../../../dist/403.html');
        return res.status(httpStatus.OK)
            .sendFile(pathToFile);
    } catch (error) {
        next(error);
    }
}