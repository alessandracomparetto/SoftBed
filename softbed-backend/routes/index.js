var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'SoftBed | La comodità a portata di click' });
});

/* GET login page. */
router.get('/accedi', function(req, res, next) {
  res.render('login', { title: 'Accedi' });
});

/* GET registration page. */
router.get('/registrati', function(req, res, next) {
  res.render('registration', { title: 'Registrazione' });
});

/* GET pagina di ricerca */
router.get('/search', function(req, res, next) {
  res.send(req.query);
})



module.exports = router;

/*
const session = require('express-session');
const bodyParser = require('body-parser');

// carichiamo crypto, la configurazione e il middleware per il database
const crypto = require('crypto');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

router.set('trust proxy', 1)

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(session({
  secret: 'supercalifragilistichespiralidoso',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))

router.get('/', (req, res) => {
  let session = req.session;
  //creo cookie
  //mi prendo da DB idutente
  // salvo nella tabella sessione
  //invio al client il cookie

  if (req.session.views) {
    req.session.views++;
  }
  else {
    req.session.views = 1;
  }
  res.send(`${req.session.views} views`);
})

*/
