const User = require('../models/user');
const Token = require('../models/token');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

describe('Tokens', () => {
    beforeEach((done) => {
         Token.deleteMany({}, () => {
             User.deleteMany({}, () => {})
         });

        done();
    });

    describe('/POST Refresh token', () => {
        it('It should return new 2 tokens', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                        chai.request(server)
                            .post('/user/login')
                            .send({email: user.email, password: user.password})
                            .end((error, response) => {
                                const refreshToken = response.body.refreshToken;
                                chai.request(server)
                                    .post('/user/refresh-tokens')
                                    .send({refreshToken: refreshToken})
                                    .end((error, response) => {
                                        response.should.have.status(200);
                                        done();
                                    });
                            })
                    }
                );
        });

        it('It should return error message (Access token instead of refresh token)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                        chai.request(server)
                            .post('/user/login')
                            .send({email: user.email, password: user.password})
                            .end((error, response) => {
                                const refreshToken = response.body.accessToken;
                                chai.request(server)
                                    .post('/user/refresh-tokens')
                                    .send({refreshToken: refreshToken})
                                    .end((error, response) => {
                                        response.should.have.status(400);
                                        done();
                                    });
                            })
                    }
                );
        });

        it('It should return error message (No token)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                        chai.request(server)
                            .post('/user/login')
                            .send({email: user.email, password: user.password})
                            .end((error, response) => {
                                const refreshToken = response.body.accessToken;
                                chai.request(server)
                                    .post('/user/refresh-tokens')
                                    .end((error, response) => {
                                        response.should.have.status(400);
                                        done();
                                    });
                            })
                    }
                );
        });
    });
});