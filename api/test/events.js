const User = require('../models/user');
const BetEvent = require('../models/betEvent');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

describe('Bet events', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            BetEvent.deleteMany({}, (err) => {
                done();
            });
        });
    });

    describe('/POST Create event', () => {
        it('It should create an event', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( async (error, response) =>  {
                    await User.findOneAndUpdate({email: user.email}, {isAdmin: true});
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email, password: user.password})
                        .end((error, response) => {
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/event/create')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({
                                    question: "Will?",
                                    answer1: "Yes",
                                    answer2: "No"
                                })
                                .end((error, response) => {
                                    response.should.have.status(200);
                                    done();
                                });
                        })}
                );
        });

        it('It should return error message (Invalid request)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end( async (error, response) =>  {
                    await User.findOneAndUpdate({email: user.email}, {isAdmin: true});
                    chai.request(server)
                        .post('/user/login')
                        .send({email: user.email, password: user.password})
                        .end((error, response) => {
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/event/create')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({
                                    question: "Will?",
                                    answer1: "Yes",
                                })
                                .end((error, response) => {
                                    response.should.have.status(400);
                                    done();
                                });
                        })}
                );
        });
    });

    describe('/GET Get all bet events', () => {
       it('It should return all exist bets', (done) => {
          chai.request(server)
              .get('/event/get-events')
              .end((error, response) => {
                  response.body.should.be.a('Array');
                  response.should.have.status(200);
                  done();
              })
       });
    });

    describe('/DELETE Finish an event', () => {
        it('It should finish an event', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end(async (error, response) => {
                        await User.findOneAndUpdate({email: user.email}, {isAdmin: true});
                        chai.request(server)
                            .post('/user/login')
                            .send({email: user.email, password: user.password})
                            .end(async (error, response) => {
                                const accessToken = response.body.accessToken;
                                await BetEvent.create({
                                    question: "Will?",
                                    answer1: "Yes",
                                    answer2: "No",
                                    coefficient1: 1,
                                    coefficient2: 1,
                                    amount1: 1,
                                    amount2: 1,
                                });
                                const event = await BetEvent.findOne({question: "Will?"});
                                const eventID = event._id;
                                chai.request(server)
                                    .delete('/event/finish-event')
                                    .set('Authorization', 'Bearer ' + accessToken)
                                    .send({
                                        eventID: eventID,
                                        answerNumber: 1
                                    })
                                    .end((error, response) => {
                                        response.should.have.status(200);
                                        done();
                                    });
                            })
                    }
                );
        });

        it('It should return error message (Event does not exist)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end(async (error, response) => {
                        await User.findOneAndUpdate({email: user.email}, {isAdmin: true});
                        chai.request(server)
                            .post('/user/login')
                            .send({email: user.email, password: user.password})
                            .end(async (error, response) => {
                                const accessToken = response.body.accessToken;
                                await BetEvent.create({
                                    question: "Will?",
                                    answer1: "Yes",
                                    answer2: "No",
                                    coefficient1: 1,
                                    coefficient2: 1,
                                    amount1: 1,
                                    amount2: 1,
                                });
                                const event = await BetEvent.findOne({question: "Will?"});
                                const eventID = event._id;
                                chai.request(server)
                                    .delete('/event/finish-event')
                                    .set('Authorization', 'Bearer ' + accessToken)
                                    .send({
                                        eventID: "5dcc9968d92cab7bd1d7b77f",
                                        answerNumber: 1
                                    })
                                    .end((error, response) => {
                                        response.should.have.status(400);
                                        done();
                                    });
                            })
                    }
                );
        });

        it('It should return error message (Invalid request)', (done) => {
            const user = {
                email: 'test@gmail.com',
                login: 'test',
                password: 'password',
            };
            chai.request(server)
                .post('/user/registration')
                .send(user)
                .end(async (error, response) => {
                        await User.findOneAndUpdate({email: user.email}, {isAdmin: true});
                        chai.request(server)
                            .post('/user/login')
                            .send({email: user.email, password: user.password})
                            .end(async (error, response) => {
                                const accessToken = response.body.accessToken;
                                await BetEvent.create({
                                    question: "Will?",
                                    answer1: "Yes",
                                    answer2: "No",
                                    coefficient1: 1,
                                    coefficient2: 1,
                                    amount1: 1,
                                    amount2: 1,
                                });
                                const event = await BetEvent.findOne({question: "Will?"});
                                const eventID = event._id;
                                chai.request(server)
                                    .delete('/event/finish-event')
                                    .set('Authorization', 'Bearer ' + accessToken)
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