const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const config = require('./config/app');
const routesUser = require('./routes/user');
const routesBetEvent = require('./routes/betEvent');
const routesBet = require('./routes/bet');

const app = express();

mongoose.connect(config.MONGODB_URI + "/totalizator-simulator", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then()
    .catch(err => console.log(err));
new require('controllers/UserController')().createBasicAdmin();


app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//user logic
app.use('/user', routesUser);
//bet event logic
app.use('/event', routesBetEvent);
//bet logic
app.use('/bet', routesBet);

app.listen(config.API_PORT);

module.exports = app;