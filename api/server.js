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

mongoose.connect(
    config.dbConfig.MONGODB_URI + config.dbConfig.MONGO_DATABASE,
    {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    })
    .then()
    .catch(err => console.log(err));

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

const User = (new (require('./controllers/UserController'))());
User.createBasicAdminIfNotExists().then().catch(err => console.log(err));
s
app.listen(config.API_PORT);

module.exports = app;