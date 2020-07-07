let createError = require('http-errors');
let express = require('express');
let router = express.Router();
let prenotazioneModel = require('../models/Prenotazione');
const Timers = require('../models/Timers');
const ModuloUtente = require('../routes/utente');
const token = ModuloUtente.token;
timer = new Timers();

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

router.post('/listaPrenotazioni', function (req, res) {
    let c=(req.headers.cookie).split("=")[1];
    if(token.verificaToken(req.body.refGestore, c)) {
        prenotazioneModel.getPrenotazioni(req.body, function (data) {
            res.send(data);
        }).catch((err) => {
            res.status(err.status).send(err.message);
        });
    }else{
        res.sendStatus(401);
    }
});

router.post('/rifiutaPrenotazione', function (req, res) {
    prenotazioneModel.rifiutaPrenotazione(req.body)
        .then(()=>{
            timer.distruggiTimeoutPrenotazione(req.body.idPrenotazione);
             res.send();
        })
        .catch((err) => {
            res.sendStatus(500);
        });
    });

router.post('/confermaPrenotazione', function (req, res) {
    prenotazioneModel.confermaPrenotazione(req.body, function(data){
        timer.distruggiTimeoutPrenotazione(req.body.idPrenotazione);
        timer.aggiungiTimeoutDichiarazione(data);
        res.send()
    }).catch((err) => {
        res.sendStatus(500);
        });
    });

router.post('/richiesta', function (req, res) {
    prenotazioneModel.create(req.body, function (dati) {
        timer.aggiungiTimeoutPrenotazione(dati);
        res.send(dati);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
    });

router.post('/annullamento', function (req, res) {
    prenotazioneModel.delete(req.body.idPrenotazione)
        .then(()=>{
        // timer.distruggiTimeout(req.body.idPrenotazione);
            res.send();
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

router.post('/listaPrenotazioniUtente', function (req, res) {
    prenotazioneModel.getPrenotazioniUtente(req.body.idUtente, function (data) {
        res.send(data);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.post('/setDichiarazione', function (req, res) {
    prenotazioneModel.setDichiarazione(req.body, function (data) {
        console.log("distruggi",req.body.idPrenotazione);
        timer.distruggiTimeoutDichiarazione(req.body.idPrenotazione);
        res.send(data);
    })
        .catch((err) => {
            res.sendStatus(500);
        });

});


module.exports = router;
