// change environment to test
process.env.NODE_ENV='test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const httpStatus = require('http-status');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const { 
    spawn,
    spawnSync 
} = require('child_process');

const ASSETS_DATA_PATH = '../../assets/data';
const CONNECTED_ADD_FILE_NAME = 'MAC.txt';
const REALTIME_DATA_FILE_NAME = 'python_data.json';

const expect = chai.expect;

// server
const {
    server
} = require('../../server');

chai.use(chaiHttp);

describe('Data', () => {
    describe('Render page', () => {
        it('Should return 200 when html is rendered', done => {
            chai.request(server)
                .get('/data')
                .end((error, res) => {                    
                    expect(res).to.have.status(httpStatus.OK);
                    expect(res.type).eql('text/html');
                    done();
                });
        });
    });

    describe('Get BLE connection history', () => {
        it('Should return 200 when connection history MAC addresses are rerturned', done => {
            chai.request(server)
                .get('/data/mac')
                .end((error, res) => {
                    const MACAddPattern = new RegExp(/(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2}) [^\n]+/);
                    // console.log(res);
                    expect(res).to.have.status(httpStatus.OK);
                    expect(res.body.addresses).to.be.an('array');
                    expect(res.body.addresses.length).to.not.equal(0);
                    res.body.addresses.forEach(add => {
                        expect(MACAddPattern.test(add)).to.be.true;
                    });

                    done();
                });
        });       
    });        

    describe('Start python client script', () => {
        it('Should return 500 if inputed MAC address is invalid', done => {
            const invalidMACAdd = 'MT:25:25:25:25:25 MI Band 2';
            chai.request(server)
                .get('/data/start-python?add='+invalidMACAdd)
                .end((error, res) => {
                    expect(res).to.have.status(httpStatus.INTERNAL_SERVER_ERROR);
                    expect(res.body.err).eql('Error starting python script');

                    done();
                });
        });
    });

    describe('Realtime communication in socket', () => {
        it('Should return 400 when communication on socket is not established', done => {
            const invalidSocketID = 'Tf3yjB0myDC__uOIAAAB';
            chai.request(server)
                .get('/data/socket?socket='+invalidSocketID)
                .end((error, res) => {
                    expect(res).to.have.status(httpStatus.BAD_REQUEST);
                    expect(res.body.msg).eql('Invalid socket id');

                    done();
                });
        });
    });
});