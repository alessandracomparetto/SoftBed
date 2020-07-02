let createError = require('http-errors');
let express = require('express');
let router = express.Router();
let ospiteModel = require('../models/Ospite')

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

//aggiungi ospite
router.post('/aggiungi', function (req, res) {
    console.log("REQ.BODY ====")
    console.log(req.body);
    ospiteModel.aggiungi(req.body,function(data){
        console.log(data);
        res.send(data);
    });
});

//elimina ospite
router.post('/elimina', function (req, res) {
    console.log("REQ.BODY ====")
    console.log(req.body);
    ospiteModel.elimina(req.body,function(data){
        console.log(data);
        res.send(data);
    });
});

//recupero ospiti
router.post('/fetch', function (req, res) {
    console.log(req.body);
    ospiteModel.fetch(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});

module.exports = router;



