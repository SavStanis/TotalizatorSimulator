const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/app');
const auth = require('./controllers/auth');
const tokensMethods = require('./controllers/tokensMethods');
const Token = require('./models/token');

const app = express();

mongoose.connect(config.MONGODB_URI + "/totalizator-simulator", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("MongoDB connected!")).catch(err => console.log(err));

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/registration', auth.getAllUsers);
app.post('/registration', auth.registerUser);
app.post('/login', auth.signIn);
app.get('/do', auth.userAuthentication, (request, response)=>{response.status(200).json({message: 'success'})});
app.post('/refresh-tokens', tokensMethods.refreshTokens);
app.get('/tokens', async (request, response) => {
    const tokens = await Token.find();
    response.status(200).json(tokens);
})

app.listen(config.API_PORT);