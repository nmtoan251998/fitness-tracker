const mongoose = require('mongoose');

const NewsHealthPosts = new mongoose.Schema({
    crawlerURI: {
        type: String,
        required: true,
        trim: true,
    },
    crawlDate: {
        type: String,
        required: true,
        trim: true,        
    },
    data: [
        {
        type: Object,
        href: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        alt: {
            type: String,
            trim: true,
        },
        src: {
            type: String,
            trim: true,
        }}
    ],    
    }, {
        timestamps: true
    }
);

/**
 * Add yours
 * - method
 * - hooks
 * - static
 */

NewsHealthPosts.static({
    findCrawledDataByDate: async function(date) {
        const crawlData = await this
            .findOne({ crawlDate: date })
            .select({ data: 1, _id: 1 })
            .lean();

        if (!crawlData) {
            return null;
        };

        return crawlData;
    },
});

module.exports = mongoose.model('new_health_post', NewsHealthPosts);