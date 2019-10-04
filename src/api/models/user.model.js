const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

const { APIError } = require('../utils/APIErrors');
const { env } = require('../../config/vars');

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
        required: true,
        default: 'other',
    },
    role: {
        type: String,
        default: 'user',
        lowercase: true,
        trim: true,
    }
    }, {
        timestamps: true,
    }
);

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
UserSchema.pre('save', async function() {
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
     */
    comparePassword: async function(candidatePassword) {
        try {
            const isPasswordMatched = await bcrypt.compare(candidatePassword, this.password);
            if (!isPasswordMatched) {

                throw new APIError('Wrong email or password', httpStatus.BAD_REQUEST);
            }            
            return isPasswordMatched;
        } catch(error) {
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
    findUserByEmail: async function(email) {
        try {
            const user = await this.findOne({ email: email });
            if (!user) {
                throw new APIError('No user found with this email', httpStatus.BAD_REQUEST);
            }
            
            return user;
        } catch (error) {
            return error;
        }                
    }
})

module.exports = mongoose.model('user', UserSchema);