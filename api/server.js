const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/app');
const auth = require('./controllers/auth');
const userMethods = require('./controllers/userMethods');
const tokensMethods = require('./controllers/tokensMethods');
const betEventMethods = require('./controllers/betEventMethods');
const betMethods = require('./controllers/betMethods');
const Token = require('./models/token');

const app = express();

mongoose.connect(config.MONGODB_URI + "/totalizator-simulator", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("MongoDB connected!")).catch(err => console.log(err));

app.use(logger('dev'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//debug requests
app.get('/get-all-users', userMethods.getAllUsers);
app.get('/get-all-rtokens', async (request, response) => {
    const tokens = await Token.find();
    response.status(200).json(tokens);
});
app.get('/bet/get-all-bets', betMethods.getAllBets);

//user logic
app.post('/user/registration', userMethods.registerUser);
app.post('/user/login', auth.signIn);
app.delete('/user/delete', auth.userAuthentication, userMethods.deleteUserByID);
app.post('/user/balance-replenishment', auth.userAuthentication, userMethods.balanceReplenishment);

//token logic
app.get('/do', auth.userAuthentication, auth.adminAuthentication, (request, response) => {response.status(200).json({message: 'success'})});
app.post('/refresh-tokens', tokensMethods.refreshTokens);

//bet event logic
//TODO:: introduce admin check before
app.post('/event/create', betEventMethods.createBetEvent);
app.get('/event/get-events', betEventMethods.getAllEvents);
app.delete('/event/finish-event', betEventMethods.finishBetEvent);
//bet logic
app.post('/bet/make-a-bet', auth.userAuthentication, betMethods.createBet);

app.listen(config.API_PORT);

module.exports = app;