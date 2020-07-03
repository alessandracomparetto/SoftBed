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
    ospiteModel.aggiungi(req.body,function(data){
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

//elimina ospite
router.post('/elimina', function (req, res) {
    ospiteModel.elimina(req.body,function(data){
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

//recupero ospiti
router.post('/fetch', function (req, res) {
    ospiteModel.fetch(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message)})
});

//recupero struttura per dichiarazione ospiti
router.post('/fetchStruttura', function (req, res) {
    strutturaModel.fetchStruttura(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message)})
});


module.exports = router;



