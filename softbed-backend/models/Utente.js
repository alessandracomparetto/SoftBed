/*Model dell utente*/
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

module.exports= {
//TODO: gestire conflitto email
    inserisciUtente:async function(datiUtente, callback) {
        const db = await makeDb(config);
        let results = {};
        let refUtente;
        try {
            await withTransaction(db, async () => {
                let sql = ('INSERT INTO `utente` (nome, cognome, dataNascita, gestore) VALUES ?');
                let datiQuery = [datiUtente.nome, datiUtente.cognome, datiUtente.dataNascita, datiUtente.gestore == 'gestore' ? '1' : '0'];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN INDIRIZZO
                    throw err
                });

                refUtente = results.insertId;

                sql = ('INSERT INTO `autenticazione` (refUtente, email, password) VALUES ?');
                datiQuery = [refUtente, datiUtente.email, datiUtente.pass];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN UTENTE
                    throw err;
                });

                console.log('Inserimento tabella utente');
                console.log(results);
                return (callback("ok"));
            });
        } //chiuusura try
        catch (err) {
            console.log(err);
        }
    },


    login:async function(datiUtente, callback) {
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
            WHERE email = ?', [datiUtente.email])
                    .catch(err => {
                        throw err;
                    });
                if (!results[0]) {
                    console.log('Utente non trovato!');
                    next(createError(404, 'Utente non trovato'));
                } else {

                    if (datiUtente.pass != results[0].password) {
                        // password non coincidenti
                        console.log('Password errata!');
                        next(createError(403, 'Password errata'));
                    } else {
                        //creo id della sessione
                        return callback(results.refUtente);
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    },

    fetch: async function (callback) {
        const db = await makeDb(config);
        let idUtente = 4;
        let infoUtente;
        /*TODO CAMBIARE refUtente */
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni dell'utente
                infoUtente = await db.query('SELECT * FROM `utente` JOIN `autenticazione` WHERE  `autenticazione`.refUtente= ? AND`utente`.idUtente= ?', [4,4]).catch(err => {
                    throw err;
                });
                return callback(infoUtente[0]);
            });
        } catch (err) {
            console.log(err);
        }
    },

    modificaDatiAggiuntivi: async function (datiUtente, callback) {
        const db = await makeDb(config);
        let results;
        try {
            await withTransaction(db, async () => {
                console.log("sto per modificare!");
                results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=? WHERE idUtente = ?',
                    [`utente`, "utente.nome", datiUtente.nome, "utente.cognome", datiUtente.cognome, "utente.codiceFiscale",
                        datiUtente.codiceFiscale, "utente.dataNascita", datiUtente.dataNascita, "utente.telefono", datiUtente.telefono, datiUtente.idUtente])
                    .catch(err => {
                    throw err;
                });
                console.log("ho modificato!");
                console.log(results);
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    }
};

