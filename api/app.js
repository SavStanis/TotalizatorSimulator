let createError = require('http-errors');
let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

app.post('/registration', (request, response) =>  {
    console.log(request.body.password);
    response.status(200).json({
        success: true,
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (reqest, response) => {
  response.send("It's fine! ");
});

app.listen(3000);
