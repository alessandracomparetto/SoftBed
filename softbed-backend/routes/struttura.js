let createError = require('http-errors');
let express = require('express');
let router = express.Router();
/* const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');*/
let strutturaModel = require('../models/Struttura')


router.get('/', function(req, res, next) {
    // console.log("sono qui");
    strutturaModel.fetch(function(data){
        // console.log(data);
        res.json(data);
    })
});


router.get('/:idStruttura', function(req, res) {
    strutturaModel.carica(req.params.idStruttura, function(data) {
        res.send(data[0]);
    })
})


router.post('/', function (req, res) {
    strutturaModel.create(req.body,function(data){
        console.log(data);
        res.send(data);
    });
});


router.post('/modificaCondizioni', function (req, res) {
    console.log("REQ.BODY ====")
    strutturaModel.modificaCondizioni(req.body,function(data){
        console.log(data);
        res.send(data);
    });
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