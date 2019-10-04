const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        match: '',
        required: true,
        trim: true,
    },
    name: {
        type: String,
        maxlength: 255,
        trim: true,
    },
    password: {
        type: String,
        minlength: 8,
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
        max: 3,        
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

module.exports = mongoose.model('user', UserSchema);