let express = require('express');
let router = express.Router();
let strutturaModel = require('../models/Struttura');
const ModuloUtente = require('./utente');
const token = ModuloUtente.token;
const Timers = require('../models/Timers');

// Cache
let cacheManager = require('cache-manager');
let cacheStrutture = cacheManager.caching({store: 'memory', max: 200, ttl: 300}); // 5 minuti
 timer = new Timers();

router.post('/', function (req, res) {
    strutturaModel.inserisciStruttura(req.body, function(data){
        timer.aggiungiTimeoutRendiconto(data);
        res.send(data);
    }).catch(()=>{
        res.sendStatus(500);
    })
});

router.post('/gestioneStruttura/', function(req, res) {
    const sessionId = (req.headers.cookie).split("=")[1];

     if (token.verificaToken(req.body.refgestore, sessionId)) {
        strutturaModel.fetch(req.body, function (data) {
            res.send(data);
        }).catch((err) => {
            res.sendStatus(500);
        })
     } else {
        res.sendStatus(401);
     }
});

router.post('/listaStruttureGestore', function (req, res) {
    const sessionId = (req.headers.cookie).split("=")[1];

    if (token.verificaToken(req.body.idutente, sessionId)) {
        strutturaModel.listaStrutture(req.body.idutente, function (data) {
            res.send(data);
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(401);
    }
});

router.post('/calcoloGuadagno/', function(req, res, next) {
    strutturaModel.calcoloGuadagno(req.body, function (data) {
        let guadagno = 0;
        let x; //prende il prezzo associato alla prenotazione e da questo tolgo le tasse
        for (let i = 0; i < data.length; i++) {
            x = data[i].costo;
            x -= ((data[i].nadulti - data[i].nesentibambini) * data[i].prezzoadulti); //levo tasse adulti
            x -= ((data[i].nbambini - data[i].nesentibambini) * data[i].prezzobambini); //levo tasse bambini
            guadagno += x;
        }
        res.send(guadagno + "");
    }).catch((err) => {
        res.sendStatus(500);
    });
});

router.get('/:idstruttura', function(req, res) {
    const id = req.params.idstruttura;

    cacheStrutture.get(id, function(err, result) {
        // Se la ricerca è salvata in cache viene inviato il risultato memorizzato
        if (result) {
            res.send(result);
        }

        // Altrimenti viene effettuata la query al db
        else {
            strutturaModel.carica(id, function(data) {

                res.send(data);

                // Inserimento in cache
                cacheStrutture.set(id, JSON.stringify(data), function(err) {
                    if (err) throw err;
                })
            })
                .catch(() =>{
                    res.sendStatus(500);
                })
        }

    })
});

router.post('/modificaCondizioni', function (req, res) {
    strutturaModel.modificaCondizioni(req.body,function(data){
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus(status);
    }).catch( (err) =>{
        res.sendStatus(500);
    })
});

router.post('/modificaCaratteristicheCasaVacanze', function (req, res) {
    strutturaModel.modificaCaratteristicheC(req.body,function(data){
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch( (err) =>{
        res.sendStatus(500);
    })
});

router.post('/modificaCaratteristicheB&B', function (req, res) {
    strutturaModel.modificaCaratteristicheB(req.body,function(data){
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch( (err) =>{
        res.sendStatus(500);
    })
});

//recupero struttura per dichiarazione ospiti e rendiconto
router.post('/fetchStruttura', function (req, res) {
    strutturaModel.fetchStruttura(req.body, function (data) {
        res.send(data);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

router.post('/setDataRendiconto', function (req, res) {
    strutturaModel.setDataRendiconto(req.body,function(data){
        let status;
        if(data.changedRows === 0){
            status = 304;
        }else{
            timer.aggiornaTimeoutRendiconto(req.body.idstruttura);
            status = 200;
        }
        res.sendStatus( status);
    }).catch( (err) =>{
        res.sendStatus(500);
    })
});

router.post('/rendiconto', function (req, res) {
    strutturaModel.rendiconto(req.body, function (data) {
        res.send(data)
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500);
    });
});

module.exports = router;


