const redis = require('redis');
const puppeteer = require('puppeteer');
const httpStatus = require('http-status');
const moment = require('moment');

const {
    redisPort
} = require('../../config/vars');

const NewsHealthPosts = require('../models/newsHealthPost');
const client = redis.createClient(redisPort);

const baseCrawlURI = 'https://baomoi.com/suc-khoe-y-te.epi';

module.exports.crawlData = async (req, res, next) => {
    try {   
        const getPostData = async (page) => {
            const postAttrs = await page.evaluate(() => {
                const imgEls = Array.from(document.querySelectorAll('.story .story__thumb a img'));                
                const anchorEls = Array.from(document.querySelectorAll('.story .story__heading a'));
        
                let postAttrs = [];
                for (index = 0; index < 16; index++) {
                    postAttrs[index] = {
                        href: 'https://baomoi.com' +anchorEls[index].getAttribute('href'),
                        title: anchorEls[index].getAttribute('title'),
                        alt: imgEls[index].getAttribute('alt'), 
                        src: imgEls[index].getAttribute('src')
                    }            
                }        
                
                return postAttrs;
            });
            return postAttrs;
        }

        (async () => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
                    
            await page.goto(baseCrawlURI);    
            
            const postEls = await getPostData(page);            
            
            await browser.close();
            
            const postJsonData = JSON.stringify(postEls, null, '\t');
            
            const cacheResult = await client.set('news-health', postJsonData);            
            if (!cacheResult) {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Error caching data' })
                    .end();
            }

            return res.status(httpStatus.OK).json(postEls).end();
        })();
        
    } catch (error) {
        next(error);
    }
}

module.exports.saveCrawlData = (req, res, next) => {
    try {
        client.get('news-health', async (error, value) => {
            if (error) {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Error getting cached crawled data' })
                    .end();
            }

            const cachedCrawledData = JSON.parse(value);
            const today = moment(new Date()).format("DD/MM/YYYY");
            const healthPosts = await NewsHealthPosts.findCrawledDataByDate(today);

            if (!healthPosts) {
                const newsHealthPosts = await new NewsHealthPosts({
                    crawlerURI: baseCrawlURI,
                    crawlDate: today,
                    data: [...cachedCrawledData],
                }).save();

                return res.status(httpStatus.CREATED).json(newsHealthPosts).end();
            } else {
                const duplicateData = [...cachedCrawledData, ...healthPosts.data];
                const cleanedData = [...new Set(duplicateData)];

                const updatedData = await NewsHealthPosts.findByIdAndUpdate(healthPosts._id, cleanedData);
                
                return res.status(httpStatus.OK).json(updatedData).end();
            }            
        });                        
    } catch (error) {
        next(error);
    }
}