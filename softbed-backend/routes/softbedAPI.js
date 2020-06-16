var createError = require('http-errors');
var express = require("express");
var router = express.Router();

// carichiamo crypto, la configurazione e il middleware per il database
const crypto = require('crypto');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

router.get("/", autenticazione)

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'SoftBed | La comodità a portata di click' });
// });

async function autenticazione(req, res, next) {
    // istanziamo il middleware
    const db = await makeDb(config);
    let results = {};
    try {

        await withTransaction(db, async() => {
            // inserimento utente
            results = await db.query('SELECT * FROM `autenticazione`\
            WHERE email = ?', [
                "provo@provoletta"
            ])
                .catch(err => {
                    throw err;
                });

            if (results.affectedRows == 0) {
                console.log('Utente non trovato!');
                next(createError(404, 'Utente non trovato'));
            } else {
                let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
                pwdhash.update("Provolona98"); // cifriamo la password
                let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale

                if (encpwd != results[0].password) {
                    // password non coincidenti
                    console.log('Password errata!');
                    next(createError(403, 'Password errata'));
                } else {
                    console.log('Utente autenticato');
                    console.log(results);
                    // recupero dello user id
                    let id_utente = results[0].id_utente;

                    // recupero informazioni anagrafiche
                    results = await db.query('SELECT `utente`.nome, `utente`.genere,\
                        DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
                        `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono\
                        FROM `utente`, `indirizzo` \
                        WHERE `utente`.id = ? AND `indirizzo`.id_utente = ?', [
                        id_utente,
                        id_utente
                    ])
                        .catch(err => {
                            throw err;
                        });

                    console.log('Dati utente:');
                    console.log(results[0]);
                    res.send({
                        title: 'Profilo Utente',
                        profile: {
                            user: req.body.email,
                            data: results[0]
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.log(err);
        next(createError(500));
    }
}

module.exports = router;