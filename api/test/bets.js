const User = require('../models/user');
const Bet = require('../models/bet');
const BetEvent = require('../models/betEvent');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

describe('Bets', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            Bet.deleteMany({}, (err) => {
                done();
            })
        });
    });

    describe('/POST Make a bet', () => {
       it('It should make a bet ', (done) => {
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
                       .end(async (error, response) => {
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
                           const user = await User.findOneAndUpdate({email: "test@gmail.com"}, {moneyAmount: 2000});
                           const eventID = event._id;
                           const userID = user._id;
                           const accessToken = response.body.accessToken;
                           chai.request(server)
                               .post('/bet/make-a-bet')
                               .set('Authorization', 'Bearer '+ accessToken)
                               .send({
                                   userID: userID,
                                   eventID: eventID,
                                   answerNumber: 1,
                                   betAmount: 200
                               })
                               .end((error, response) => {
                                   response.should.have.status(200);
                                   done();
                               });
                       })}
               );
       });

        it('It should return error (Not enough money on balance) ', (done) => {
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
                        .end(async (error, response) => {
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
                            const user = await User.findOneAndUpdate({email: "test@gmail.com"}, {moneyAmount: 200});
                            const eventID = event._id;
                            const userID = user._id;
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/bet/make-a-bet')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({
                                    userID: userID,
                                    eventID: eventID,
                                    answerNumber: 1,
                                    betAmount: 400
                                })
                                .end((error, response) => {
                                    response.should.have.status(400);
                                    response.body.should.have.property('message').eql('Not enough money!');
                                    done();
                                });
                        })}
                );
        });

        it('It should return error (Invalid request) ', (done) => {
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
                        .end(async (error, response) => {
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
                            const user = await User.findOneAndUpdate({email: "test@gmail.com"}, {moneyAmount: 2000});
                            const eventID = event._id;
                            const userID = user._id;
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/bet/make-a-bet')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({
                                    userID: userID,
                                    eventID: eventID,
                                })
                                .end((error, response) => {
                                    response.should.have.status(400);
                                    response.body.should.have.property('message').eql('Invalid request!');
                                    done();
                                });
                        })}
                );
        });

        it('It should return error (Invalid number of answer) ', (done) => {
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
                        .end(async (error, response) => {
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
                            const user = await User.findOneAndUpdate({email: "test@gmail.com"}, {moneyAmount: 2000});
                            const eventID = event._id;
                            const userID = user._id;
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/bet/make-a-bet')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({
                                    userID: userID,
                                    eventID: eventID,
                                    answerNumber: -23,
                                    betAmount: 400
                                })
                                .end((error, response) => {
                                    response.should.have.status(400);
                                    response.body.should.have.property('message').eql('Invalid number of answer!');
                                    done();
                                });
                        })}
                );
        });

        it('It should return error (Invalid bet amount) ', (done) => {
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
                        .end(async (error, response) => {
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
                            const user = await User.findOneAndUpdate({email: "test@gmail.com"}, {moneyAmount: 2000});
                            const eventID = event._id;
                            const userID = user._id;
                            const accessToken = response.body.accessToken;
                            chai.request(server)
                                .post('/bet/make-a-bet')
                                .set('Authorization', 'Bearer '+ accessToken)
                                .send({
                                    userID: userID,
                                    eventID: eventID,
                                    answerNumber: 1,
                                    betAmount: -100
                                })
                                .end((error, response) => {
                                    response.should.have.status(400);
                                    response.body.should.have.property('message').eql('Invalid bet amount!');
                                    done();
                                });
                        })}
                );
        });
    });
});