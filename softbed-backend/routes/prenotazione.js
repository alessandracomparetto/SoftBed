let createError = require('http-errors');
let express = require('express');
let router = express.Router();

let prenotazioneModel = require('../models/Prenotazione')

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
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
