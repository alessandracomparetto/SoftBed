var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
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

// Utilizza la cartella 'public' di React come cartella statica di riferimento
app.use(express.static(path.resolve(__dirname, 'react-client', 'build')));

app.use('/search', ricercaRouter);
app.use('/upload', uploadRouter);
app.use('/booking', prenotazioneRouter);
app.use('/building', strutturaRouter);
app.use('/user', utenteRouter);
app.use('/mail', mailRouter);
app.use('/guest', ospiteRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'react-client', 'build', 'index.html'));
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
  //res.render('error');

});

module.exports = app;
