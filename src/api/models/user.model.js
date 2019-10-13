const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const APIError = require('../utils/APIErrors');
const {
    env,
    secretKey
} = require('../../config/vars');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /[0-9a-zA-z]+\@[a-zA-Z].+/,
        required: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        maxlength: 255,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 128,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        lowercase: true,
        trim: true,
    }
}, {
    timestamps: true,
});

/**
 * Add yours
 * - pre hooks
 * - methods
 * - statics
 */

/**
 * Hash users password in the pre-save hook
 * @return {Promise<String>}
 */
UserSchema.pre('save', async function () {
    try {
        const round = (env === 'test') ? 1 : 10;
        const user = this;

        user.password = await bcrypt.hash(this.password, round);
    } catch (error) {
        return error;
    }
})

UserSchema.method({
    /**
     * Compare candidate password with the hashed password in db
     * @param {String} candidatePassword 
     * 
     * @return {Boolean}
     * @throws {<APIError>}
     */
    comparePassword: async function (candidatePassword) {
        try {
            const isPasswordMatched = await bcrypt.compare(candidatePassword, this.password);
            if (!isPasswordMatched) {

                throw new APIError({
                    message: 'Sai tài khoản hoặc mật khẩu rùi',
                    status: httpStatus.BAD_REQUEST
                });
            }
            return isPasswordMatched;
        } catch (error) {
            return error;
        }
    },
})

UserSchema.static({
    /**
     * Find user by email
     * @param {String} email - User email
     * 
     * @return {<User>}
     */
    findUserByEmail: async function (email) {
        try {
            const user = await this.findOne({
                email: email
            });
            if (!user) {
                throw new APIError({
                    message: 'Không tìm thấy email nào giống như này cả',
                    status: httpStatus.BAD_REQUEST
                });
            }

            return user;
        } catch (error) {
            return error;
        }
    },

    /**
     * Find user by user id
     * @param {ObjectId} id 
     * 
     * @return {<User>}
     * 
     * @throws {<APIError>}
     */
    findUserById: async function (id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new APIError({
                    message: 'Invalid user id',
                    status: httpStatus.BAD_REQUEST
                });
            }

            const user = await this.findById(id);

            return user;
        } catch (error) {
            return error;
        }
    },
    /**
     * Verify a json web token and return current loged in user id
     * @param {String} token - json web token
     * 
     * @return {ObjecId}
     */
    verifyJwt: async function(token) {
        return await jwt.verify(token, secretKey.value);
    }
})

module.exports = mongoose.model('user', UserSchema);