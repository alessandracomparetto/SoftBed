/*Model dell utente*/
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');


module.exports= {
    inserisci:async function(datiUtente, callback) {
        console.log("la mia rotta")
        const db = await makeDb(config);
        let results = {};
        let refUtente;
        try {
            await withTransaction(db, async () => {
                results= await db.query('SELECT email FROM autenticazione WHERE autenticazione.email = ?', [datiUtente.email])
                    .catch((err) => {throw createError(500)});

                if(results.length === 0) { //se non c'è una corrispondenza
                    let sql = ('INSERT INTO `utente` (nome, cognome, dataNascita, gestore) VALUES ?');
                    let datiQuery = [datiUtente.nome, datiUtente.cognome, datiUtente.dataNascita, datiUtente.gestore];
                    results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN UTENTE
                        throw createError(500);
                    });
                    refUtente = results.insertId;
                    sql = ('INSERT INTO `autenticazione` (refUtente, email, password) VALUES ?');
                    datiQuery = [refUtente, datiUtente.email, datiUtente.pass];
                    results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN AUTENTICAZIONE
                        throw createError(500);
                    });
                    sql = ('SELECT u.idUtente, u.nome, u.cognome, u.codiceFiscale, u.dataNascita, u.refIndirizzo, u.refComuneNascita, u.telefono, u.gestore, a.email\
                    FROM utente AS u JOIN autenticazione AS a WHERE u.idUtente=? AND u.idUtente=a.refUtente');
                    datiQuery = [refUtente];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {
                        throw createError(500);
                    });
                    return (callback(results[0]));
                }
                else{
                    return callback(400);
                }
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
            WHERE email = ?', [datiUtente.email]).catch(err => {throw createError(500);});
                if (!results[0]) { //email errata
                    return callback(404);
                } else {
                    if (datiUtente.pass != results[0].password) { //password errata
                        return callback(400);
                    } else {
                        let refUtente = results[0].refUtente;
                        let sql = ('SELECT u.idUtente, u.nome, u.cognome, u.codiceFiscale, u.dataNascita, u.refIndirizzo, u.refComuneNascita, u.telefono, u.gestore, a.email\
                        FROM utente AS u JOIN autenticazione AS a WHERE u.idUtente=? AND u.idUtente=a.refUtente');
                        let datiQuery = [refUtente];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {throw createError(500);});
                        return (callback(results[0]));
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
        console.log("DATI UTENTEE");
        console.log(datiUtente.idUtente);
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
                    console.log("INFO UTENTE");
                    console.log(infoUtente);
                    console.log(infoUtente[0]);
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
        let idIndirizzo = datiUtente.refIndirizzo;
        let residenza;
        let nascita;
        console.log(idIndirizzo);
        try {
            await withTransaction(db, async () => {
                console.log("sto per modificare!");
               if(datiUtente.refIndirizzo===null && datiUtente.refComuneResidenza!= null){
                    let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                    let datiQuery = [datiUtente.via, datiUtente.numeroCivico, datiUtente.cap, datiUtente.refComuneResidenza];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {console.log(err);});
                    idIndirizzo = results.insertId;
               }else if(datiUtente.refComuneResidenza!= null) {
                   results = await db.query('UPDATE ?? SET ??=? ,??=?,??=?,??=? WHERE idIndirizzo = ?',
                       [`indirizzo`, "indirizzo.via", datiUtente.via, "indirizzo.numeroCivico", datiUtente.numeroCivico,
                           "indirizzo.cap", datiUtente.cap, "indirizzo.refComune", datiUtente.refComuneResidenza, datiUtente.refIndirizzo])
                       .catch(err => {console.log(err);});
               }
                results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=? WHERE idUtente = ?',
                    ["utente", "utente.codiceFiscale", datiUtente.codiceFiscale, "utente.dataNascita", datiUtente.dataNascita, "utente.refComuneNascita", datiUtente.refComuneNascita,
                        "utente.telefono", datiUtente.telefono ,"utente.gestore", datiUtente.gestore, "utente.refIndirizzo",idIndirizzo, datiUtente.idUtente])
                    .catch(err => {console.log(err)});
                if(datiUtente.refComuneResidenza) {
                    residenza = await db.query('SELECT comuni.idComune as refComuneResidenza, province.nomeProvincia as provinciaResidenza, regioni.nomeRegione as regioneResidenza FROM comuni JOIN province JOIN regioni WHERE comuni.idComune=? AND comuni.refProvincia=province.idProvincia AND province.refRegione=regioni.idRegione',
                        [datiUtente.refComuneResidenza]).catch(err => {console.log(err);});
                }
                if(datiUtente.refComuneNascita){
                    nascita = await db.query('SELECT comuni.idComune as refComuneNascita, province.nomeProvincia as provinciaNascita, regioni.nomeRegione as regioneNascita FROM comuni JOIN province JOIN regioni WHERE comuni.idComune=? AND comuni.refProvincia=province.idProvincia AND province.refRegione=regioni.idRegione',
                        [datiUtente.refComuneNascita]).catch(err => {console.log(err);});
                }

                let infoUtente = await db.query('SELECT utente.*, autenticazione.email FROM utente JOIN autenticazione WHERE utente.idUtente=? AND utente.idUtente=autenticazione.refUtente ',[datiUtente.idUtente])
                    .catch(err => {
                        console.log(err);
                    });
                for(var propt in residenza[0]){
                    infoUtente[0][propt]=residenza[0][propt]
                }
                for(var propt in nascita[0]){
                    infoUtente[0][propt]=nascita[0][propt]
                }
                return callback(infoUtente[0]);
                });
        } catch (err) {
            throw err;
        }

    },

    aggiungiDatoPagamento:async function(datoPagamento, callback) {
        let idUtente = datoPagamento.idUtente;
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async () => {
                let sql = ('INSERT INTO `datoPagamento` (nomeIntestatario, cognomeIntestatario, numeroCarta, cvv, dataScadenza, refUtente) VALUES ?');
                let datiQuery = [datoPagamento.nomeIntestatario, datoPagamento.cognomeIntestatario, datoPagamento.numeroCarta, datoPagamento.cvv, datoPagamento.dataScadenza, idUtente];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN DATO PAGAMENTO
                    throw createError(500);
                });
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
        const db=await makeDb(config);
        try{
            await withTransaction(db,async()=> {
                let listaDatiPagamento = await db.query('SELECT * FROM datoPagamento WHERE datoPagamento.refUtente=?', [idUtente]).catch(err => {
                    console.log(err);
                });
                return callback(listaDatiPagamento);
            });
        }
        catch(err){
            throw err;
        }
    },
};

