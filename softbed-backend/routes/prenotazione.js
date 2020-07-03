let createError = require('http-errors');
let express = require('express');
let router = express.Router();

let prenotazioneModel = require('../models/Prenotazione')

timer=new Timer();

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

router.post('/listaPrenotazioni', function (req, res) {
    prenotazioneModel.getPrenotazioni(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});
router.post('/rifiutaPrenotazione', function (req, res) {
    prenotazioneModel.rifiutaPrenotazione
        .then(()=>{
            timer.distruggiTimeout(req.body.idPrenotazione);
            res.send();
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
    });

router.post('/confermaPrenotazione', function (req, res) {
    prenotazioneModel.confermaPrenotazione
        .then(()=>{
            timer.distruggiTimeout(req.body.idPrenotazione);
            res.send();
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        });
    });
router.post('/richiesta', function (req, res) {
    prenotazioneModel.create(req.body, function (idPrenotazione) {
        timer.aggiungiTimeout(idPrenotazione);
        res.send(`${idPrenotazione}`);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        });
    });

router.post('/annullamento', function (req, res) {
    prenotazioneModel.delete(req.body.idPrenotazione)
        .then(()=>{
        timer.distruggiTimeout(req.body.idPrenotazione);
        res.send();
        })
        .catch((err) => {
        res.status(err.status).send(err.message);
        });
})
router.post('/listaPrenotazioniUtente', function (req, res) {
    prenotazioneModel.getPrenotazioniUtente(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});


module.exports = router;
