let createError = require('http-errors');
let express = require('express');
let router = express.Router();

let prenotazioneModel = require('../models/Prenotazione')

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});


router.post('/richiesta', function (req, res) {

    prenotazioneModel.create(req.body, function (data) {
        console.log(data.insertId); // todo: to remove
        res.send(`${data.insertId}`);
    }).catch(err => res.send(err));
});

router.post('/annullamento', function (req, res) {
    prenotazioneModel.delete(req.body.idPrenotazione, function () {
        res.send();
    }).catch(err => res.send(err));
})

module.exports = router;
