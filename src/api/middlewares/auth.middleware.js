const httpStatus = require('http-status');

const UserModel = require('../models/user.model');

module.exports.getQueryToken = (req, res, next) => {
    try {        
        const token = req.cookies.jwt;

        req.headers.authorization = 'Bearer ' + token;
        
        next();
    } catch (error) {
        next(error);
    }
}

module.exports.isAdmin = async (req, res, next) => {
    const currentUser = req.user;

    const user = await UserModel.findById(currentUser._id);

    if (user.role !== 'admin') {
        return res.status(httpStatus.FORBIDDEN)
            .json({ msg: 'You have no permission to access this resource' })
            .end();
    }

    return next();
}