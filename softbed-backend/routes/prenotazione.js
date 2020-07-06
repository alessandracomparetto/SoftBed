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
            console.log("chiamo il timer prenotazione1");
            timer.distruggiTimeoutPrenotazione(req.body.idPrenotazione);
             res.send();
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
    });

router.post('/confermaPrenotazione', function (req, res) {
    prenotazioneModel.confermaPrenotazione(req.body)
        .then(()=>{
            console.log("chiamo il timer prenotazione2")
            timer.distruggiTimeoutPrenotazione(req.body.idPrenotazione);
            res.send();
        }).catch((err) => {
                console.log(err);
        });
    });

router.post('/richiesta', function (req, res) {
    prenotazioneModel.create(req.body, function (dati) {
        console.log("chiamo il timer prenotazione3");
        console.log(timer);
        timer.aggiungiTimeoutPrenotazione(dati);
        res.send(dati);
        })
        .catch((err) => {
            res.sendStatus(err.status);
        });
    });

router.post('/annullamento', function (req, res) {
    prenotazioneModel.delete(req.body.idPrenotazione)
        .then(()=>{
        // timer.distruggiTimeout(req.body.idPrenotazione);
            res.send();
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
});

router.post('/listaPrenotazioniUtente', function (req, res) {
    prenotazioneModel.getPrenotazioniUtente(req.body.idUtente, function (data) {
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});


router.post('/rendiconto', function (req, res) {
    console.log("sono qui");
    prenotazioneModel.rendiconto(req.body, function (data) {
        res.send(data);
    })
        .catch((err) => {
            res.status(err.status).send(err);
        });
});



module.exports = router;
