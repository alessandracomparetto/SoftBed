var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')

const uploadRouter = require('./routes/upload');
const prenotazioneRouter = require('./routes/prenotazione');
const strutturaRouter = require('./routes/struttura');
const utenteRouter=require('./routes/utente');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/prenotazione', prenotazioneRouter);
app.use('/struttura', strutturaRouter);
app.use('/utente', utenteRouter);

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
  //res.render('error');

});
module.exports = app;
