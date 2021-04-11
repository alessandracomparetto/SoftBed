let createError = require('http-errors');
let express = require('express');
let router = express.Router();
let ospiteModel = require('../models/Ospite')
let strutturaModel = require('../models/Struttura')

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

//aggiungi ospite
router.post('/aggiungi', function (req, res) {
    ospiteModel.aggiungi(req.body,function() {
        res.send();
    }).catch((err) => {
        res.sendStatus(500);})
});

//recupero ospiti
router.post('/fetch', function (req, res) {
    ospiteModel.fetch(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.sendStatus(500);})
});

module.exports = router;



