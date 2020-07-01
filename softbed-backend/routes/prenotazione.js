let createError = require('http-errors');
let express = require('express');
let router = express.Router();

let prenotazioneModel = require('../models/Prenotazione')

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

router.post('/listaPrenotazioni', function (req, res) {
    prenotazioneModel.getPrenotazioni(req.body,function (data){
        console.log(data);
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});
router.post('/rifiutaPrenotazione', function (req, res) {
    console.log("richiesta di rifiuto arrivataAAAAAA");
    console.log(req.body);
    console.log(req.body.idPrenotazione);
    prenotazioneModel.rifiutaPrenotazione(req.body,function (data){
        res.send("OK"); })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
    });

router.post('/confermaPrenotazione', function (req, res) {
    console.log("richiesta di prenotazione arrivataAAAAAA");
    console.log(req.body);
    console.log(req.body.idPrenotazione);
    prenotazioneModel.confermaPrenotazione(req.body,function (data){
        res.send("OK"); })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});
router.post('/richiesta', function (req, res) {
    prenotazioneModel.create(req.body, function (idPrenotazione) {
        res.send(`${idPrenotazione}`);
    })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});

router.post('/annullamento', function (req, res) {

    prenotazioneModel.delete(req.body.idPrenotazione, function () {
        res.send();
    })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
})


module.exports = router;
