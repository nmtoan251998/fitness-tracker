// set NODE_ENV to test
process.env.NODE_ENV='test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const httpStatus = require('http-status');

const expect = chai.expect;

// server
const server = require('../../server');

chai.use(chaiHttp);

describe('Test', function() {
    describe('Test /test endpoint', function() {
        it('Should return 200 when api is succesfully accessed', function(done) {
            chai.request(server)
                .get('/test')
                .end((error, res) => {
                    expect(res).to.have.status(httpStatus.OK);
                    expect(res.body).to.have.property('msg');
                    expect(res.body.msg).eql('Successfully get /test endpoint');

                    done();
                })
        });
    });
});