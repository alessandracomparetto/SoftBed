let express = require('express');
let router = express.Router();
let strutturaModel = require('../models/Struttura');

router.post('/', function (req, res) {
    strutturaModel.inserisciStruttura(req.body, function(data){
       res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

router.post('/gestioneStruttura/:id', function(req, res) {
    strutturaModel.fetch(req.params.id, req.body , function(data) {
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

router.get('/listaStruttureGestore', function (req, res) {
    strutturaModel.listaStrutture(function(data){
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

router.post('/calcoloGuadagno/', function(req, res, next) {
    strutturaModel.calcoloGuadagno(req.body, function(data){
        let guadagno = 0;
        let x; //prende il prezzo associato alla prenotazione e da questo tolgo le tasse
        for(let i=0; i<data.length; i++){
            x=data[i].costo;
            x-= ((data[i].nAdulti-data[i].nEsentiBambini) * data[i].prezzoAdulti); //levo tasse adulti
            x-= ((data[i].nBambini-data[i].nEsentiBambini) * data[i].prezzoBambini); //levo tasse bambini
            guadagno+=x;
        }
        res.send(guadagno+"");
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

router.get('/:idStruttura', function(req, res) {
    strutturaModel.carica(req.params.idStruttura, function(data) {
        res.send(data);
    }).catch((err) =>{
        res.status(err.status).send();
    })
});

router.post('/modificaCondizioni', function (req, res) {
    strutturaModel.modificaCondizioni(req.body,function(data){
        console.log(data.message);
        let status = (data.changedRows === 0) ? 304: 200;
        res.status(status);
        res.send();
    }).catch( (err) =>{
        res.status(err.status).send(err.message);
    })
});

router.post('/modificaCaratteristicheCasaVacanze', function (req, res) {
    strutturaModel.modificaCaratteristicheC(req.body,function(data){
        console.log(data.message);
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch( (err) =>{
        res.status(err.status).send(err.message);
    })
});

router.post('/modificaCaratteristicheB&B', function (req, res) {
    strutturaModel.modificaCaratteristicheB(req.body,function(data){
        console.log(data.message);
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch( (err) =>{
        res.status(err.status).send(err.message);
    })
});

module.exports = router;
