const httpStatus = require('http-status');

const UserModel = require('../models/user.model');
const { APIError } = require('../utils/APIErrors');

module.exports.getUser = (req, res, next) => {
    try {
        const user = req.user;

        return res.status(httpStatus.OK).json(user).end();
    } catch (error) {
        next(error);
    }
}

module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();

        if (!users) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    msg: 'No users found'
                })
                .end();
        }

        return res.status(httpStatus.OK).json(users).end();
    } catch (error) {
        next(error);
    }
}

module.exports.getUserById = async (req, res, next) => {
    try {        
        const userId = req.params.id;
        const currentUser = req.user;        

        const user = await UserModel.findUserById(userId);
        if (user instanceof APIError) {
            return res.status(user.status).json(user).end();
        }

        if (currentUser.id !== userId) {
            return res.status(httpStatus.FORBIDDEN)
                .json({ msg: 'What are you trying to do?' })
                .end();
        }

        if (!user) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    msg: 'No user found'
                })
                .end();
        }

        return res.status(httpStatus.OK).json(user).end();
    } catch (error) {
        next(error);
    }
}

module.exports.delUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({ role: 'user' });
        
        if (!users) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'No users found' }).end();
        }

        const removeResult = await UserModel.deleteMany({ role: 'user' });

        return res.status(httpStatus.OK).json(removeResult.deletedCount).end();
    } catch (error) {
        next(error);
    }
}