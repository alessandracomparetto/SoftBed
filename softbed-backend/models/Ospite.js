const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');
module.exports={

    aggiungi:async function(data, callback) {
        let datiOspite = data.listaOspiti;
        let refPrenotazione = data.refPrenotazione;
        const db = await makeDb(config);
        let results = {};
        let results2 = {};
        let refIndirizzo, refOspite;
        try {
            await withTransaction(db, async () => {
                for (let i = 0; i < datiOspite.length; i++) {
                    let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                    let datiQuery = [datiOspite[i].via, datiOspite[i].numero, datiOspite[i].cap, datiOspite[i].refComuneResidenza];

                    results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN INDIRIZZO
                        throw createError(500);
                        });

                    refIndirizzo = results.insertId;


                    sql = ('INSERT INTO `ospite` (nome, cognome, codiceFiscale, dataNascita, refindirizzo, refComuneNascita, refPrenotazione, tassa, dataArrivo, permanenza) VALUES ?');
                    datiQuery = [datiOspite[i].nome, datiOspite[i].cognome, datiOspite[i].codiceFiscale, datiOspite[i].dataNascita, refIndirizzo, datiOspite[i].refComuneNascita, refPrenotazione, datiOspite[i].tassa, datiOspite[i].dataArrivo, datiOspite[i].permanenza];
                    results = await db.query(sql, [[datiQuery]]).catch(err => { //INSERIMENTO IN OSPITE
                        throw err;
                    });

                    refOspite = results.insertId;

                    sql = ('INSERT INTO `documenti` (percorso, refPrenotazione) VALUES ?');
                    if (datiOspite[i].documenti) {
                        for (documento of datiOspite[i].documenti) {
                            datiQuery = [documento, refPrenotazione];
                            results2 = await db.query(sql, [[datiQuery]]).catch(err => {
                                throw err;
                            });
                        }
                        console.log("Inseriti documenti");
                    }//end for
                }
                return callback(results);

            });
        }
        catch (err) {
            throw err;
        }
    },


    fetch: async function (refPrenotazione, callback) {
        const db = await makeDb(config);
        let infoOspite;
        console.log(refPrenotazione);

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
                        throw createError(500);
                    });
                    console.log(infoOspite);
                    return callback(infoOspite);
            });
        } catch (err) {
            throw err;
        }
    },

    fetchDocumenti: async function(data, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(('SELECT D.percorso FROM documenti as D\
                    WHERE D.refPrenotazione = ?'), [data.refPrenotazione]).catch((err) => {throw err});
                return callback(risultato);
            })
        }
        catch (err) {
            throw err;
        }

    }

};
