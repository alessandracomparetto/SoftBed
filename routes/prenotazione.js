let createError = require('http-errors');
let express = require('express');
let router = express.Router();
let prenotazioneModel = require('../models/Prenotazione');
const Timers = require('../models/Timers');
const ModuloUtente = require('./utente');
const token = ModuloUtente.token;
timer = new Timers();

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

router.post('/listaPrenotazioniStruttura', function (req, res) {
    let c=(req.headers.cookie).split("=")[1];
    if(token.verificaToken(req.body.refgestore, c)) {
        prenotazioneModel.getPrenotazioni(req.body, function (data) {
            res.send(data);
        }).catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(401);
    }
});

router.post('/rifiutaPrenotazione', function (req, res) {
    prenotazioneModel.rifiutaPrenotazione(req.body)
        .then(()=>{
            timer.distruggiTimeoutPrenotazione(req.body.idprenotazione);
            res.send();
        })
        .catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
    });

router.post('/confermaPrenotazione', function (req, res) {
    prenotazioneModel.confermaPrenotazione(req.body, function(data){
        timer.distruggiTimeoutPrenotazione(req.body.idprenotazione);
        timer.aggiungiTimeoutDichiarazione(data);
        res.send()
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500);
        });
    });

router.post('/richiesta', function (req, res) {
    prenotazioneModel.create(req.body, function (dati) {
        timer.aggiungiTimeoutPrenotazione(dati);
        res.send(dati);
        })
        .catch((err) => {
            console.error(err)
            res.sendStatus(500)
        });
    });

router.post('/annullamento', function (req, res) {
    prenotazioneModel.delete(req.body.idprenotazione)
        .then(()=>{
        // timer.distruggiTimeout(req.body.idprenotazione);
            res.send();
        })
        .catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
});

router.post('/listaPrenotazioniUtente', function (req, res) {
    prenotazioneModel.getPrenotazioniUtente(req.body.idutente, function (data) {
        res.send(data);
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500)
    });
});

router.post('/setDichiarazione', function (req, res) {
    prenotazioneModel.setDichiarazione(req.body, function () {
        timer.distruggiTimeoutDichiarazione(req.body.idprenotazione);
        res.send();
    })
        .catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });

});


module.exports = router;
