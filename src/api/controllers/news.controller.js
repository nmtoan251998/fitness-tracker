const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const puppeteer = require('puppeteer');
const httpStatus = require('http-status');
const path = require('path');

const baseFilename = 'baomoi.com';
const crawledNewsDataFilePath = path.join(__dirname, '../../assets/data', baseFilename+'.crawl.json');

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
        
            const baseURI = 'https://baomoi.com/suc-khoe-y-te.epi';
            await page.goto(baseURI);    
            
            const postEls = await getPostData(page);            
            
            await browser.close();
            
            const postJsonData = JSON.stringify(postEls, null, '\t');
            
            await fs.writeFileAsync(
                crawledNewsDataFilePath,
                postJsonData
            ).then(data => data);

            return res.status(httpStatus.OK).json(postEls).end();
        })();
        
    } catch (error) {
        next(error);
    }
}

module.exports.saveCrawlData = async (req, res, next) => {
    try {
        const crawledNewsData = await fs.readFileAsync(
            crawledNewsDataFilePath
            , 'utf-8'
        ).then(data => JSON.parse(data));

        return res.status(httpStatus.CREATED).json(crawledNewsData).end();
    } catch (error) {
        next(error);
    }
}