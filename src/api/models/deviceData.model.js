const mongoose = require('mongoose');

const DeviceDataSchema = new mongoose.Schema({
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

DeviceDataSchema.static({
    /**
     * Get data by MAC address
     * @param {String} macAdd - MAC address
     * 
     * @error {String} error - Wrong MAC address pattern
     * 
     * @return {String} macAdd - MAC address of BLE
     * @return {String} serial - Serial of BLE
     * @return {String} softwareRevision - Software revision of BLE
     * @return {String} hardwareRevision - Hardware revision of BLE
     * @return {[String]} connectionTime - Connection time to server
     */
    findByMacAdd: async function(macAdd) {
        try {
            const MACAddPattern = new RegExp(/(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})/g);
            
            if (!MACAddPattern.test(macAdd)) {
                const error = 'Wrong MAC address pattern';
                return { error };
            }

            const data = await this.findOne({ macAdd: macAdd }).lean();            

            if (!data) {
                return null;
            }

            return data;
        } catch (error) {
            return error;
        }
    },


});

module.exports = mongoose.model('devices_data', DeviceDataSchema);