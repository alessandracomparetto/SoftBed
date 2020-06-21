var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});
router.post('/', registrazioneStruttura);
async function registrazioneStruttura(req, res, next){
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
                req.body.cap,
            ])
            //inserimento indirizzo struttura
            /*results = await db.query('INSERT INTO `indirizzo` \
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
            ])*/
                .catch(err => {
                    throw err;
                });

            console.log('Inserimento tabella indirizzo');
        });
    } catch (err) {
        console.log(err);
        next(createError(500));
    }
}
module.exports = router;