/*Model dell utente*/
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');

module.exports= {
//TODO: gestire email già presente
    inserisci:async function(datiUtente, callback) {
        const db = await makeDb(config);
        let results = {};
        let refUtente;
        try {
            await withTransaction(db, async () => {
                let sql = ('INSERT INTO `utente` (nome, cognome, dataNascita, gestore) VALUES ?');
                let datiQuery = [datiUtente.nome, datiUtente.cognome, datiUtente.dataNascita, datiUtente.gestore == 'gestore' ? '1' : '0'];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN UTENTE
                    throw createError(500);
                });

                refUtente = results.insertId;

                sql = ('INSERT INTO `autenticazione` (refUtente, email, password) VALUES ?');
                datiQuery = [refUtente, datiUtente.email, datiUtente.pass];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN AUTENTICAZIONE
                 /*   if(err.code=== 'ER_DUP_ENTRY'){
                        return callback(createError(500, "Utente già registrato"));
                    }*/
                    throw createError(500);
                });
                sql = ('SELECT u.idUtente, u.nome, u.cognome, u.codiceFiscale, u.dataNascita, u.refIndirizzo, u.refComuneNascita, u.telefono, u.gestore, a.email\
                    FROM utente AS u JOIN autenticazione AS a WHERE u.idUtente=? AND u.idUtente=a.refUtente');
                datiQuery = [refUtente];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw createError(500);
                });

                console.log(results);
                return (callback(results));
            });
        } //chiusura try
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
                        throw createError(500);
                    });
                if (!results[0]) {
                    throw createError(404, "Utente non trovato");
                } else {

                    if (datiUtente.pass != results[0].password) {
                        throw createError(404, "Password errata");
                    } else {
                        //todo recuperare dati utente
                        let refUtente = results.refUtente;

                        let sql = ('SELECT u.idUtente, u.nome, u.cognome, u.codiceFiscale, u.dataNascita, u.refIndirizzo, u.refComuneNascita, u.telefono, u.gestore, a.email\
                        FROM utente AS u JOIN autenticazione AS a WHERE u.idUtente=? AND u.idUtente=a.refUtente');
                        let datiQuery = [refUtente];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw createError(500);
                        });

                        console.log(results);
                        return (callback(results));
                    }
                }
            });
        } catch (err) {
            throw err;
        }
    },

    fetch: async function (datiUtente, callback) {
        const db = await makeDb(config);
        let infoUtente;
        try {
            await withTransaction(db, async () => {
                if(datiUtente.refIndirizzo !== null && datiUtente.refComuneNascita!==null){
                    infoUtente = await db.query('SELECT U.idUtente, U.nome, U.cognome, U.codiceFiscale, U.dataNascita, U.refIndirizzo,\
                U.refComuneNascita, U.telefono, U.gestore, A.email, I.via, I.numeroCivico, I.cap, CN.nomeComune as comuneNascita, PN.nomeProvincia AS provinciaNascita,\
                RN.nomeRegione AS regioneNascita, CR.nomeComune as comuneResidenza, CR.idComune AS refComuneResidenza, PR.nomeProvincia AS provinciaResidenza, RR.nomeRegione AS regioneResidenza\
                 FROM `utente` AS U JOIN `autenticazione` AS A JOIN `indirizzo` AS I ,`comuni` as CR , `province` as PR, `regioni` as RR, `comuni` AS CN , `province` AS PN, `regioni` AS RN\
                    WHERE  U.idUtente= ? AND A.refUtente=U.idUtente AND  U.refIndirizzo=I.idIndirizzo AND I.refComune=CR.idComune\
                    AND `CR`.refProvincia = `PR`.idProvincia AND `PR`.refRegione = `RR`.idRegione AND U.refComuneNascita = `CN`.idComune\
                    AND `CN`.refProvincia = `PN`.idProvincia AND `PN`.refRegione = `RN`.idRegione' ,[datiUtente.idUtente])
                        .catch(err => {
                            throw err;
                        });
                    return callback(infoUtente[0]);
                }

                else if(datiUtente.refIndirizzo !== null){
                    infoUtente = await db.query('SELECT U.idUtente, U.nome, U.cognome, U.codiceFiscale, U.dataNascita, U.refIndirizzo,\
                    U.refComuneNascita, U.telefono, U.gestore, A.email, I.via, I.numeroCivico, I.cap, C.nomeComune as comuneResidenza, P.nomeProvincia AS provinciaResidenza,\
                    R.nomeRegione AS regioneResidenza\
                    FROM `utente` AS U JOIN `autenticazione` AS A JOIN `indirizzo` AS I JOIN `comuni` AS C JOIN `province` AS P JOIN `regioni` AS R\
                    WHERE  U.idUtente= ? AND A.refUtente=U.idUtente AND U.refIndirizzo= I.idIndirizzo AND I.refComune=C.idComune\
                    AND C.refProvincia = P.idProvincia AND P.refRegione = R.idRegione' , [datiUtente.idUtente])
                        .catch(err => {
                            throw err;
                        });
                    return callback(infoUtente[0]);
                }

                else{
                    console.log("sono qui")
                    infoUtente = await db.query('SELECT U.idUtente, U.nome, U.cognome, U.codiceFiscale, U.dataNascita, U.refComuneNascita, U.telefono, U.gestore, A.email, C.nomeComune as comuneNascita, P.nomeProvincia AS provinciaNascita, R.nomeRegione AS regioneNascita \
                        FROM `utente` AS U JOIN `autenticazione` AS A JOIN `comuni` AS C JOIN `province` AS P JOIN `regioni` AS R \
                        WHERE  U.idUtente= ? AND A.refUtente=U.idUtente AND U.refComuneNascita=C.idComune AND C.refProvincia = P.idProvincia AND P.refRegione = R.idRegione' , [datiUtente.idUtente])
                        .catch(err => {
                            throw err;
                        });
                    return callback(infoUtente[0]);
                }

            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    modificaDatiAggiuntivi: async function (datiUtente, callback) {
        const db = await makeDb(config);
        let results;
        try {
            await withTransaction(db, async () => {
                console.log("sto per modificare!");

                if(datiUtente.refIndirizzo == null && datiUtente.via){
                    let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                    let datiQuery = [datiUtente.via, datiUtente.numeroCivico, datiUtente.cap, datiUtente.refComuneResidenza];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {
                        throw createError(500);
                    });

                    let idIndirizzo = results.insertId;

                    results = await db.query('UPDATE ?? SET ??=? WHERE idUtente = ?',
                        [`utente`, "utente.refIndirizzo", idIndirizzo, datiUtente.idUtente])
                        .catch(err => {
                            throw createError(500);
                        });

                }else{
                    results = await db.query('UPDATE ?? SET ??=? ,??=?,??=?,??=? WHERE idIndirizzo = ?',
                        [`indirizzo`, "indirizzo.via", datiUtente.via, "indirizzo.numeroCivico", datiUtente.numeroCivico,
                            "indirizzo.cap", datiUtente.cap, "indirizzo.refComune", datiUtente.refComuneResidenza, datiUtente.refIndirizzo])
                        .catch(err => {
                            throw createError(500);
                        });
                }

                results = await db.query('UPDATE ?? SET ??=?,??=?,??=? WHERE idUtente = ?',
                    [`utente`, "utente.codiceFiscale", datiUtente.codiceFiscale, "utente.telefono", datiUtente.telefono, "utente.refComuneNascita", datiUtente.refComuneNascita, datiUtente.idUtente])
                    .catch(err => {
                        throw createError(500);
                    });

                results = await db.query('UPDATE ?? SET ??=?,??=?  WHERE refUtente= ?',
                    [`autenticazione`, "autenticazione.email", datiUtente.email, "autenticazione.password", datiUtente.password, datiUtente.idUtente])
                    .catch(err => {
                        throw createError(500);
                    });

                if(datiUtente.gestore === "on"){
                    console.log("Sto diventando gestore");
                    results = await db.query('UPDATE ?? SET ??=? WHERE idUtente = ?',
                        [`utente`, "utente.gestore", 1, datiUtente.idUtente])
                        .catch(err => {
                            throw createError(500);
                        });
                }

                console.log("ho modificato!");

                let sql = ('SELECT u.idUtente, u.nome, u.cognome, u.codiceFiscale, u.dataNascita, u.refIndirizzo, u.refComuneNascita, u.telefono, u.gestore, a.email\
                        FROM utente AS u JOIN autenticazione AS a WHERE u.idUtente=? AND u.idUtente=a.refUtente');
                let datiQuery = [datiUtente.idUtente];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw createError(500);
                });

                console.log(results);
                return (callback(results));

                });
        } catch (err) {
            throw err;
        }

    },

    aggiungiDatoPagamento:async function(datoPagamento, callback) {
        //TODO PASSARE L'ID UTENTE
        let idUtente = 1;
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async () => {
                let sql = ('INSERT INTO `datoPagamento` (nomeIntestatario, cognomeIntestatario, numeroCarta, cvv, dataScadenza, refUtente) VALUES ?');
                let datiQuery = [datoPagamento.nomeIntestatario, datoPagamento.cognomeIntestatario, datoPagamento.numeroCarta, datoPagamento.cvv, datoPagamento.dataScadenza, idUtente];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN DATO PAGAMENTO
                    throw createError(500);
                });

                console.log('Inserimento tabella datoPagamento');
                console.log(results);
                return (callback("ok"));
            });
        } //chiusura try
        catch (err) {
            throw err;
        }
    },

    eliminaDatoPagamento: async function(data,res){
        const db = await makeDb(config);

        console.log("sto per eliminare");
        console.log("id"+data.numeroCarta);
        let query = (`DELETE FROM datoPagamento WHERE numeroCarta = ?`);

        try {
            await withTransaction(db, async () => {
                let result = await db.query(query, data.numeroCarta).catch(() => {throw createError(500)});
                console.log(result);
                if (result.affectedRows === 0) throw createError(404, "Dato di pagamento non trovata");
                else return res(result);
            })
        } catch(err) {
            throw createError(500);
        }
    },

    getDatiPagamento: async function(data, callback){
        let idUtente=data.idUtente;
        console.log(idUtente);
        const db=await makeDb(config);
        try{
            await withTransaction(db,async()=> {
                let listaDatiPagamento = await db.query('SELECT * FROM datoPagamento WHERE datoPagamento.refUtente=?', [[[idUtente]]]).catch(err => {
                    throw createError(500);
                });

                return callback(listaDatiPagamento);
            });
        }
        catch(err){
            throw err;
        }
    },
};

