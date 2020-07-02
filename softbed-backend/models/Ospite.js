const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');
module.exports={

    aggiungi:async function(datiOspite, callback) {
        let refPrenotazione =1
        const db = await makeDb(config);
        let results = {};
        let results2 = {};
        let refIndirizzo, refOspite;
        try {
            await withTransaction(db, async () => {
                let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                let datiQuery = [datiOspite.via, datiOspite.numero, datiOspite.cap, datiOspite.refComuneResidenza];

                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN INDIRIZZO
                    throw err
                });

                refIndirizzo = results.insertId;


                sql = ('INSERT INTO `ospite` (nome, cognome, codiceFiscale, dataNascita, refindirizzo, refComuneNascita, refPrenotazione, tassa, dataArrivo, permanenza) VALUES ?');
                datiQuery = [datiOspite.nome, datiOspite.cognome, datiOspite.codiceFiscale, datiOspite.dataNascita, refIndirizzo, datiOspite.refComuneNascita, refPrenotazione, datiOspite.tassa, datiOspite.dataArrivo, datiOspite.permanenza];
                results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN OSPITE
                    throw err;
                });

                refOspite = results.insertId;

                sql = ('INSERT INTO `documenti` (refOspite, percorso) VALUES ?');
                if(datiOspite.documenti) {
                    for(documento of datiOspite.documenti){
                        datiQuery = [refOspite, documento];
                        results2 = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw err;
                        });
                    }
                    console.log("Inseriti documenti");
                }//end for

                return callback(results);

            });
        } //chiusura try
        catch (err) {
            console.log(err);
        }
    },

    elimina: async function(data,callback){
        const db = await makeDb(config);
        console.log(data);
        try {
            await withTransaction(db, async () => {
                let query = (`SELECT * FROM ospite WHERE idOspite= ? AND refPrenotazione=?`);
                let datiQuery = [data.idOspite, data.refPrenotazione];
                let result = await db.query(query, datiQuery).catch(() => {throw createError(500)});
                console.log(result);
                let refIndirizzo = result[0].refIndirizzo;
                console.log("INDIRIZZO:");
                console.log(refIndirizzo);
                query = (`DELETE FROM ospite WHERE idOspite= ? AND refPrenotazione=?`);
                datiQuery = [data.idOspite, data.refPrenotazione];
                result = await db.query(query, datiQuery).catch(() => {throw createError(500)});
                if (result.affectedRows === 0) throw createError(404, "Ospite non trovato");
                else{
                    query = (`DELETE FROM indirizzo WHERE idIndirizzo=?`);
                    let result2 = await db.query(query, refIndirizzo).catch(() => {throw createError(500)});
                    if (result2.affectedRows === 0) throw createError(404, "Indirizzo non trovato");
                    else return callback(result);
                }

            })
        } catch(err) {
            throw err;
        }
    },

    fetch: async function (refPrenotazione, callback) {
        /*TODO refPrenotazione */
        const db = await makeDb(config);
        let infoOspite;

        try {
            await withTransaction(db, async () => {
                //recupero le informazioni
                infoOspite = await db.query('SELECT O.idOspite, O.nome, O.cognome, O.codiceFiscale, O.dataNascita,\
                O.refComuneNascita, O.tassa, O.dataArrivo, O.permanenza, O.refPrenotazione, I.via, I.numeroCivico, I.cap, CN.nomeComune as comuneNascita, PN.nomeProvincia AS provinciaNascita,\
                RN.nomeRegione AS regioneNascita, CR.nomeComune as comuneResidenza, CR.idComune AS refComuneResidenza, PR.nomeProvincia AS provinciaResidenza, RR.nomeRegione AS regioneResidenza\
                 FROM `ospite` AS O JOIN `indirizzo` AS I ,`comuni` as CR , `province` as PR, `regioni` as RR, `comuni` AS CN , `province` AS PN, `regioni` AS RN\
                    WHERE  O.refPrenotazione= ? AND  O.refIndirizzo=I.idIndirizzo AND I.refComune=CR.idComune\
                    AND `CR`.refProvincia = `PR`.idProvincia AND `PR`.refRegione = `RR`.idRegione AND O.refComuneNascita = `CN`.idComune\
                    AND `CN`.refProvincia = `PN`.idProvincia AND `PN`.refRegione = `RN`.idRegione' ,[refPrenotazione])
                    .catch(err => {
                        throw err;
                    });
                    console.log(infoOspite);
                    return callback(infoOspite);
            });
        } catch (err) {
            console.log(err);
        }
    },

};
