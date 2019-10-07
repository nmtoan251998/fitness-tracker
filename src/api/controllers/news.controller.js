const redis = require('redis');
const puppeteer = require('puppeteer');
const httpStatus = require('http-status');
const moment = require('moment');
const CronJob = require('cron').CronJob;

const { redisPort } = require('../../config/vars');
const { APIError } = require('../utils/APIErrors');
const NewsHealthPosts = require('../models/newsHealthPost');

const redisClient = redis.createClient(redisPort);
const baseCrawlURI = 'https://baomoi.com/suc-khoe-y-te.epi';

const getPostData = async (page) => {
    const postAttrs = await page.evaluate(() => {
        const imgEls = Array.from(document.querySelectorAll('.story .story__thumb a img'));                
        const anchorEls = Array.from(document.querySelectorAll('.story .story__heading a'));

        let postAttrs = [];
        for (index = 0; index < 10; index++) {
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

const crawling = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
            
    await page.goto(baseCrawlURI);
    
    const postEls = await getPostData(page);          

    await browser.close();
    return postEls
}

/**
 * Set cron job for crawling news health posts
 * @param {String} time 
 * 
 * Seconds: 0-59
 * Minutes: 0-59
 * Hours: 0-23
 * Day of Month: 1-31
 * Months: 0-11 (Jan-Dec)
 * Day of Week: 0-6 (Sun-Sat)
 */
const crawlingCronJob = async (time) => {
    try {
        const cronJob = new CronJob({
            cronTime: time,
            onTick: async function() {
                const posts = await crawling();        
                const postJsonData = JSON.stringify(posts, null, '\t');
                await redisClient.set('news-health', postJsonData, redis.print);
                console.log(`Crawling news health posts...`);
            },
            start: true,
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        return cronJob;
    } catch (error) {
        throw new APIError('Crawling timeout');
    }    
}

const removeDuplicateObject = (arr, key) => {

    const unique = arr
        .map(e => e[key])
        .map((e, i, final) => final.indexOf(e) === i && i) // store the keys of the unique objects
        .filter(e => arr[e]).map(e => arr[e]); // eliminate the dead keys & store unique objects
        
    return unique;
}

module.exports.crawlData = async (req, res, next) => {
    try {
        const posts = await crawling();
        const postJsonData = JSON.stringify(posts, null, '\t');
        console.log(posts);       
        await redisClient.set('news-health', postJsonData, redis.print);        

        const cronJob6am = crawlingCronJob('0 0 6 * * 0-6');
        const cronJob12am = crawlingCronJob('0 0 12 * * 0-6');
        const cronJob6pm = crawlingCronJob('0 0 18 * * 0-6');
        const cronJob12pm = crawlingCronJob('0 0 24 * * 0-6');

        cronJob6am.start();
        cronJob12am.start();
        cronJob6pm.start();
        cronJob12pm.start();

        return res.status(httpStatus.OK).json({ msg:'OK'}).end();
        
    } catch (error) {
        next(error);
    }
}

module.exports.saveCrawlData = (req, res, next) => {
    try {
        redisClient.get('news-health', async (error, value) => {
            if (error) {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Error getting cached crawled data' })
                    .end();
            }

            const today = moment(new Date()).format("DD/MM/YYYY");
            const healthPosts = await NewsHealthPosts.findCrawledDataByDate(today);
            
            const cachedCrawledData = JSON.parse(value);            
            if (!healthPosts) {                
                const newsHealthPosts = await new NewsHealthPosts({
                    crawlerURI: baseCrawlURI,
                    crawlDate: today,
                    data: [...cachedCrawledData],
                }).save();
                return res.status(httpStatus.CREATED).json(newsHealthPosts).end();
            } else {                
                const duplicatedData = [...healthPosts.data, ...cachedCrawledData];
                const uniqeData = removeDuplicateObject(duplicatedData, 'title');  
                const uniqeJsonData = JSON.stringify(uniqeData, null);                
                redisClient.set('news-health', uniqeJsonData);

                const updatedNewsHealthPosts = await NewsHealthPosts
                    .findByIdAndUpdate(
                        healthPosts._id, 
                        { data: uniqeData }
                    );
                
                return res.status(httpStatus.CREATED).json(updatedNewsHealthPosts).end();
            }
            
        });

        const updateNewsHealthPosts = new CronJob({
            cronJob: '0 0 1 * * 0-6',
            onTick: function() {
                redis.get('news-health', async (error, posts) => {
                    const today = moment(new Date()).format("DD/MM/YYYY");
                    const healthPosts = await NewsHealthPosts.findCrawledDataByDate(today);

                    await NewsHealthPosts
                        .findByIdAndUpdate(
                            healthPosts._id, 
                            { data: posts }
                        )
                })
            },
            start: true,
            timeZone: 'Asia/Ho_Chi_Minh'
        });

        updateNewsHealthPosts.start();
    } catch (error) {
        next(error);
    }
}

module.exports.newsHealthPosts = (req, res, next) => {
    try {        
        redisClient.get('news-health', async (error, value) => {
            if (error) {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ msg: 'Error getting cached crawled data' })
                    .end();
            }

            if (value) {
                return res.status(httpStatus.OK).json(JSON.parse(value)).end();
            }

            const today = moment(new Date()).format("DD/MM/YYYY");
            const newsHealthPosts = await NewsHealthPosts.findCrawledDataByDate(today);
            if (!newsHealthPosts) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .json({ msg: 'Crawl more data' })
                    .end();
            }            

            return res.status(httpStatus.OK).json(newsHealthPosts).end();
        })
    } catch (error) {
        next(error);
    }
}

module.exports.getByDate = async (req, res, next) => {
    try {
        const dateFormat = new RegExp(/\w+\/\w+\/\w\w\w\w/);
        const date = req.query.date.toString().trim();
        
        if (!dateFormat.test(date)) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Wrong date format' }).end();
        }

        const postsByDate = await NewsHealthPosts.findCrawledDataByDate(date);

        if (!postsByDate) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'No posts found' }).end();
        }

        return res.status(httpStatus.OK).json(postsByDate).end();
    } catch (error) {
        next(error);
    }
}