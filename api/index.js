const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/app');
const auth = require('./controllers/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/registration', auth.getAllUsers);
app.post('/registration', auth.registerUser);

app.use(logger('dev'));
app.listen(config.API_PORT);