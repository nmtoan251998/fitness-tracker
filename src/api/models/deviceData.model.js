const mongoose = require('mongoose');
const httpStatus = require('http-status');
const Schema = mongoose.Schema;

const {
    APIError
} = require('../utils/APIErrors');

const DeviceDataSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    macAdd: {
        type: String,
        required: true,
        trim: true,
        match: /(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})/g,
        unique: true,
    }, 
    serial: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    softwareRevision: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    hardwareRevision: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    connectionTime: [String]
},  {
        timestamps: true
    }
);

/**
 * Add yours
 * - methods
 * - hooks
 * - statics
 */

DeviceDataSchema.static({
    /**
     * Get data by MAC address
     * @param {String} macAdd - MAC address
     * 
     * @return {String} macAdd - MAC address of BLE
     * @return {String} serial - Serial of BLE
     * @return {String} softwareRevision - Software revision of BLE
     * @return {String} hardwareRevision - Hardware revision of BLE
     * @return {[String]} connectionTime - Connection time to server
     * 
     * @throws {<APIError>} 
     *  - name: APIError
     *  - message: Wrong MAC address pattern
     *  - status: 400
     * @throws {<APIError>} 
     *  - name: APIError
     *  - message: No data found
     *  - status: 404
     */
    findByMacAdd: async function(macAdd) {
        try {
            const MACAddPattern = new RegExp(/(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})$/g);            
            
            if (!MACAddPattern.test(macAdd)) {
                throw new APIError('Wrong MAC address pattern', httpStatus.BAD_REQUEST);
            }

            const data = await this.findOne({ macAdd: macAdd }).lean();            

            if (!data) {
                throw new APIError('No data found', httpStatus.NOT_FOUND);
            }

            return data;
        } catch (error) {
            return error;
        }
    },


});

module.exports = mongoose.model('devices_data', DeviceDataSchema);