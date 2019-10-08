const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const UserModel = require('../models/user.model');
const { APIError } = require('../utils/APIErrors');
const { secretKey } = require('../../config/vars');

module.exports.signup = async (req, res, next) => {
    try {        
        const {
            email, 
            name,
            password,
            phone,
            age,
            gender,            
        } = req.body;
        
        const isEmailExisted = await UserModel.findOne({ email }).lean();        
        if (isEmailExisted) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: 'This email is already taken' }).end();
        }

        const newUser = await new UserModel({
            email,
            name,
            password,
            phone,
            age: parseInt(age),
            gender,            
        }).save();

        return res.status(httpStatus.CREATED).json(newUser).end();
    } catch (error) {
        next(error);
    }
}

module.exports.signin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await UserModel.findUserByEmail(email);
        if (user instanceof APIError) {
            return res.status(httpStatus.BAD_REQUEST).json(user).end();
        }
                        
        const isPasswordMatched = await user.comparePassword(password);        
        if (isPasswordMatched instanceof APIError) {
            return res.status(httpStatus.BAD_REQUEST).json(isPasswordMatched).end();
        }

        const token = await jwt.sign({
            id: user._id
        }, secretKey, { expiresIn: '24h' });

        return res.status(httpStatus.OK)
            .json({ 
                user,
                token: 'Bearer ' + token
            })
            .end();
    } catch (error) {
        next(error);
    }
}