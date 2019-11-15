const User = require('../models/user');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

describe('Users', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/POST users', () => {
        it('It should create one user', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eql('success');
                    done();
                })
        });

        it('It should not create 2 users with one email', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            User.create(user);
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                })
        });

        it('It should not create user with invalid request (without password)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                })
        });

        it('It should not create user with invalid request (without login)', (done) => {
            const user = {
                email: 'test@gmail.com',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                })
        });

        it('It should not create user with invalid request (without email)', (done) => {
            const user = {
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                })
        });
    });


    describe('/POST Login users', () => {
        it('It should return tokens', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( (error, response) =>  {
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email, password: user.password})
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.body.should.have.property('accessToken').an('String');
                            response.body.should.have.property('refreshToken').an('String');
                            done();
                        })}
                );
        });

        it('It should return error message (request without password)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( (error, response) =>  {
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email})
                        .end((error, response) => {
                            response.should.have.status(400);
                            response.body.should.have.property('message');
                            done();
                        })}
                );
        })

        it('It should return error message (request without email)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( (error, response) =>  {
                    chai.request(server)
                        .post('/user/login')
                        .send({password: user.password})
                        .end((error, response) => {
                            response.should.have.status(400);
                            response.body.should.have.property('message');
                            done();
                        })}
                );
        })
    });

    describe('/DELETE Delete user', () => {
        it('It should delete user', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( (error, response) =>  {
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email, password: user.password})
                        .end((error, response) => {
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .delete('/user/delete')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .end((error, response) => {
                                   response.should.have.status(200);
                                   done();
                                });
                        })}
                );
        });
    });

    describe('/POST Balance replenishment', () => {
        it('It should replenish balance of user', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( (error, response) =>  {
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email, password: user.password})
                        .end((error, response) => {
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/user/balance-replenishment')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({moneyAmount: 2000})
                                .end((error, response) => {
                                    response.should.have.status(200);
                                    done();
                                });
                        })}
                );
        });

        it('It should return error message', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( (error, response) =>  {
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email, password: user.password})
                        .end((error, response) => {
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/user/balance-replenishment')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({moneyAmount: -1})
                                .end((error, response) => {
                                    response.should.have.status(400);
                                    done();
                                });
                        })}
                );
        });
    });
});