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
        let infoUtente;
        /*TODO CAMBIARE refUtente */
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni dell'utente
                infoUtente = await db.query('SELECT U.idUtente, U.nome, U.cognome, U.codiceFiscale, U.dataNascita, U.refIndirizzo,\
                U.refComuneNascita, U.telefono, U.gestore, A.email, A.password, I.via, I.numeroCivico, I.cap, CN.nomeComune as comuneNascita, PN.nomeProvincia AS provinciaNascita,\
                RN.nomeRegione AS regioneNascita, CR.nomeComune as comuneResidenza, CR.idComune AS refComuneResidenza, PR.nomeProvincia AS provinciaResidenza, RR.nomeRegione AS regioneResidenza\
                 FROM `utente` AS U JOIN `autenticazione` AS A JOIN `indirizzo` AS I ,`comuni` as CR , `province` as PR, `regioni` as RR, `comuni` AS CN , `province` AS PN, `regioni` AS RN\
                    WHERE  U.idUtente= ? AND A.refUtente=U.idUtente AND  U.refIndirizzo=I.idIndirizzo AND I.refComune=CR.idComune\
                    AND `CR`.refProvincia = `PR`.idProvincia AND `PR`.refRegione = `RR`.idRegione AND U.refComuneNascita = `CN`.idComune\
                    AND `CN`.refProvincia = `PN`.idProvincia AND `PN`.refRegione = `RN`.idRegione' ,[1])
                    .catch(err => {
                    throw err;
                });
                if(infoUtente[0] !== undefined) {
                    console.log("utente ha inserito nascita e residenza");
                    return callback(infoUtente[0]);
                }
                else{
                    infoUtente = await db.query('SELECT U.idUtente, U.nome, U.cognome, U.codiceFiscale, U.dataNascita, U.refIndirizzo,\
                    U.refComuneNascita, U.telefono, U.gestore, A.email, A.password, I.via, I.numeroCivico, I.cap, C.nomeComune as comuneResidenza, P.nomeProvincia AS provinciaResidenza,\
                    R.nomeRegione AS regioneResidenza,\
                    FROM `utente` AS U JOIN `autenticazione` AS A JOIN `indirizzo` AS I JOIN `comuni` AS C JOIN `province` AS P JOIN `regioni` AS R\
                    WHERE  U.idUtente= ? AND A.refUtente=U.idUtente AND U.refIndirizzo= I.idIndirizzo AND I.refComune=C.idComune\
                    AND C.refProvincia = P.idProvincia AND P.refRegione = R.idRegione' , [1])
                        .catch(err => {
                            throw err;
                        });
                    if(infoUtente[0] !== undefined) {
                        console.log("utente ha inserito solo residenza");
                        return callback(infoUtente[0]);
                    }
                    else{
                        infoUtente = await db.query('SELECT U.idUtente, U.nome, U.cognome, U.codiceFiscale, U.dataNascita, U.refIndirizzo,\
                        U.refComuneNascita, U.telefono, U.gestore, A.email, A.password, C.nomeComune as comuneNascita, P.nomeProvincia AS provinciaNascita,\
                        R.nomeRegione AS regioneNascita, \
                        FROM `utente` AS U JOIN `autenticazione` AS A JOIN `comuni` AS C JOIN `province` AS P JOIN `regioni` AS R \
                        WHERE  U.idUtente= ? AND A.refUtente=U.idUtente AND U.refComuneNascita=C.idComune\
                        AND C.refProvincia = P.idProvincia AND P.refRegione = R.idRegione' , [1])
                            .catch(err => {
                                throw err;
                            });
                        if(infoUtente[0] !== undefined) {
                            console.log("utente ha inserito solo nascita");
                            return callback(infoUtente[0]);
                        }
                        else {
                            console.log("utente non ha inserito né nascita né residenza")
                            infoUtente = await db.query('SELECT * FROM `utente` JOIN `autenticazione`\
                            WHERE  `utente`.idUtente= ? AND `autenticazione`.refUtente=`utente`.idUtente', [1])
                                .catch(err => {
                                    throw err;
                                });
                            return callback(infoUtente[0]);
                        }
                    }

                }
            });
        } catch (err) {
            console.log(err);
        }
    },

    modificaDatiAggiuntivi: async function (datiUtente, callback) {
        const db = await makeDb(config);
        let results, refIndirizzo;
        try {
            await withTransaction(db, async () => {
                console.log("sto per modificare!");
                results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=? WHERE idUtente = ?',
                    [`utente`, "utente.nome", datiUtente.nome, "utente.cognome", datiUtente.cognome, "utente.codiceFiscale",
                        datiUtente.codiceFiscale, "utente.dataNascita", datiUtente.dataNascita, "utente.telefono", datiUtente.telefono, "utente.refComuneNascita", datiUtente.refComuneNascita, datiUtente.idUtente])
                    .catch(err => {
                    throw err;
                });

                results = await db.query('UPDATE ?? SET ??=?,??=?  WHERE refUtente= ?',
                    [`autenticazione`, "autenticazione.email", datiUtente.email, "autenticazione.password", datiUtente.password, datiUtente.idUtente])
                    .catch(err => {
                        throw err;
                    });

                if(datiUtente.gestore === "on"){
                    console.log("Sto diventando gestore");
                    results = await db.query('UPDATE ?? SET ??=? WHERE idUtente = ?',
                        [`utente`, "utente.gestore", 1, datiUtente.idUtente])
                        .catch(err => {
                            throw err;
                        });
                }

                if(datiUtente.refComuneResidenza!== undefined) {
                    results = await db.query('SELECT * FROM `utente`\
                    WHERE idUtente = ?', [datiUtente.idUtente])
                        .catch(err => {
                            throw err;
                        });
                    console.log(results);
                    if (results[0].refIndirizzo === null) {
                        console.log('Indirizzo non ancora inserito!');
                        let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                        let datiQuery = [datiUtente.via, datiUtente.numeroCivico, datiUtente.cap, datiUtente.refComuneResidenza];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw err;
                        });
                        console.log('Inserimento in indirizzo');
                        console.log(results);
                        refIndirizzo = results.insertId;

                        results = await db.query('UPDATE ?? SET ??=? WHERE idUtente = ?',
                            [`utente`, "utente.refIndirizzo", refIndirizzo, datiUtente.idUtente])
                            .catch(err => {
                                throw err;
                            });
                        console.log("Inserimento in utente")
                    }
                    else if(results[0].refIndirizzo !== null && datiUtente.via != undefined){
                        results = await db.query('UPDATE ?? SET ??=? ,??=?,??=?,??=? WHERE idIndirizzo = ?',
                            [`indirizzo`, "indirizzo.via", datiUtente.via, "indirizzo.numeroCivico", datiUtente.numeroCivico,
                                "indirizzo.cap", datiUtente.cap, "indirizzo.refComune", datiUtente.refComuneResidenza, datiUtente.refIndirizzo])
                            .catch(err => {
                                throw err;
                            });
                        console.log("inserito indirizzo in utente")
                    }
                }
                console.log("ho modificato!");
                console.log(results);
                return callback(results);

                });
        } catch (err) {
            console.log(err);
        }

    }
};

