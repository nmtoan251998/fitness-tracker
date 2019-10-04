const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const AvgFitnessData = new mongoose.Schema({
    macAdd: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'devices_data',
    },
    avgHeartRate: {
        required: true,
        type: Number
    },
    avgSteps: {
        required: true,
        type: Number
    },
    avgFatgram: {
        required: true,
        type: Number
    },
    avgCallories: {
        required: true,
        type: Number
    },
    avgMeters: {
        required: true,
        type: Number
    },
    date: {
        type: Date,
    },
    },{ 
        timestamps: true 
    }
);

module.exports = mongoose.model('avg_fitness_data', AvgFitnessData);