let express = require('express');
let router = express.Router();
let strutturaModel = require('../models/Struttura');

router.post('/', function (req, res) {
    strutturaModel.inserisciStruttura(req.body, function(data){
       res.send(data);
    })
});

router.post('/gestioneStruttura/:id', function(req, res) {
    strutturaModel.fetch(req.params.id, req.body , function(data) {
        res.send(data);
    })
});

router.get('/listaStruttureGestore', function (req, res) {
    strutturaModel.listaStrutture(function(data){
        res.send(data);
    })
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
    })
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
        console.log(err);
    })
});

router.post('/modificaCaratteristicheCasaVacanze', function (req, res) {
    strutturaModel.modificaCaratteristicheC(req.body,function(data){
        console.log(data.message);
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch( (err) =>{
        console.log(err);
    })
});

router.post('/modificaCaratteristicheB&B', function (req, res) {
    strutturaModel.modificaCaratteristicheB(req.body,function(data){
        console.log(data.message);
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch( (err) =>{
        console.log(err);
    })
});

module.exports = router;


// TODO: Da rimuovere
/*async function registrazioneStruttura(req, res, next){
    console.log(req.body);
    console.log("mondos");
    console.log(req.body.via);
    console.log(req.body.cap);
    console.log(req.body.numero);
    //Inserimento informazioni nel database
    const db = makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async () => {
            console.log("ok");
            results = await db.query('INSERT INTO `indirizzo` \
                (via, numero, cap, refComune)\
                SELECT ? AS via, ? AS numero, ? AS cap ', [
                req.body.via,
                req.body.numero,
                req.body.cap
            ])
            //inserimento indirizzo struttura
            /!*results = await db.query('INSERT INTO `indirizzo` \
                (via, numero, cap, refComune)\
                SELECT ? AS via, ? AS numero, ? AS cap, `comuni`.id AS refComune\
                FROM `regioni`, `province`, `comuni`\
                WHERE `regioni`.nome=? AND `province`.nome=? AND `comuni`.nome=?', [
                req.body.address,
                req.body.addressnum,
                req.body.cap,
                req.body.region,
                req.body.state,
                req.body.town,
            ])*!/
                .catch(err => {
                    throw err;
                });
            console.log('Inserimento tabella indirizzo');
        });
    } catch (err) {
        console.log(err);
        next(createError(500));
    }
}*/