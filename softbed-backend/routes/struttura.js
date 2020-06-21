var createError = require('http-errors');
var express = require('express');
var router = express.Router();


/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});
// Upload Endpoint
router.post('/', (req, res) => {
    console.log(req);
    console.log("Ok");
});
/*
//
// /!* Inserimento informazioni preliminari struttura *!/
// router.post('/InserimentoInformazioni', registrazioneInizialeStruttura);
//
// // middleware di registrazione
// async function registrazioneInizialeStruttura(req, res, next) {
//     // istanziamo il middleware
//     const db = await makeDb(config);
//     let results = {};
//     try {
//         await withTransaction(db, async() => {
//             //inserimento indirizzo struttura
//             // inserimento indirizzo
//             results = await db.query('INSERT INTO `indirizzo` (via, numero, cap, refComune)\
//         SELECT ? AS via, ? AS numero, ? AS cap, `comuni`.id AS refComune\
//         FROM `regioni`, `province`, `comuni`\
//         WHERE `regioni`.nome=? AND `province`.nome=? AND `comuni`.nome=?', [
//                     req.body.address,
//                         req.body.addressnum,
//                         req.body.cap,
//                         req.body.region,
//                         req.body.state,
//                         req.body.town,
//         ])
//         .catch(err => {
//                     throw err;
//             });
//
//             console.log('Inserimento tabella indirizzo');
//             console.log(results);
//             /!*!// inserimento utente
//             results = await db.query('INSERT INTO `struttura` \
//         (nomeStruttura, refGestore, refIndirizzo, rendicontoEffettuato) \
//         SELECT ? AS idStruttura ? AS nomeStruttura, ? AS refGestore, \
//         ? AS refIndirizzo, ? AS rendicontoEffettuato ')[
//                 req.body.name,
//                 refGestore,
//                 reqIndirizzo,
//                 reqRendiconto,
//             ])
//             .catch(err => {
//                 throw err;
//             });
//
//             console.log('Inserimento tabella utente');
//             console.log(results);
//
//             // recupero dello user id
//             let id_utente = results.insertId;
//
//            *!/
//
//
*/

module.exports = router;