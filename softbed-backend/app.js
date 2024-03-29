var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const { config } = require('./db/config');
const { makeDb, withTransaction } = require('./db/dbmiddleware');
db = makeDb(config);
const app = express();
app.use(cookieParser());

const uploadRouter = require('./routes/upload');
const prenotazioneRouter = require('./routes/prenotazione');
const strutturaRouter = require('./routes/struttura');
const ricercaRouter = require('./routes/ricerca');
const mailRouter = require('./routes/mail');
const ospiteRouter = require('./routes/ospite');

const ModuloUtente = require('./routes/utente');
const utenteRouter = ModuloUtente.router;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/search', ricercaRouter);
app.use('/upload', uploadRouter);
app.use('/prenotazione', prenotazioneRouter);
app.use('/struttura', strutturaRouter);
app.use('/utente', utenteRouter);
app.use('/mail', mailRouter);
app.use('/ospite', ospiteRouter);

app.use(express.static(path.join(__dirname, 'public')));

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
