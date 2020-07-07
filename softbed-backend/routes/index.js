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
});

module.exports = router;
