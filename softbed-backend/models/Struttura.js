/*Model della struttura*/
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');



module.exports= {
    inserisciStruttura: async function (datiStruttura, callback) {
        console.log("qui forse si");
        const db = await makeDb(config);
        let results = {};
        let refIndirizzo;
        console.log("qui ci sono");
        try {
            await withTransaction(db, async () => {
                //inserimento into indirizzo
                let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                let datiQuery = [datiStruttura.via, datiStruttura.numeroCivico, datiStruttura.cap, datiStruttura.nomeComune];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw err
                });
                //se tutto va bene, trovo id indirizzo e inserisco nella struttura
                refIndirizzo = results.insertId;
                let giorno = new Date().toLocaleDateString();
                sql = ('INSERT INTO `struttura` (nomestruttura, tipologiastruttura, refgestore, refindirizzo, rendicontoeffettuato) VALUES ?');
                //TODO: REF GESTORE
                datiQuery = [datiStruttura.nomeStruttura, datiStruttura.tipologiaStruttura, 3, refIndirizzo, giorno];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw err;
                });
                console.log('Inserimento tabella struttura');
                console.log(results);
                refStruttura = results.insertId;
                sql = ('INSERT INTO `fotografie` (refStruttura, percorso) VALUES ?');
                if (datiStruttura.foto) {
                    for (foto of datiStruttura.foto) {
                        datiQuery = [refStruttura, foto];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw err;
                        }); //chiusura query foto
                    }
                    console.log("inserite foto");
                }//end for

                sql = ('INSERT INTO `condizioni` (refStruttura, minSoggiorno, maxSoggiorno, oraInizioCheckIn, oraInizioCheckOut, oraFineCheckIn, \
                            oraFineCheckOut,pagamentoLoco,pagamentoOnline, prezzoBambini, prezzoAdulti, percentualeRiduzione, nPersoneRiduzione, esclusioneSoggiorni, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            politicaCancellazione, penaleCancellazione, preavvisoDisdetta) VALUES ?');
                datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti, datiStruttura.percentualeRiduzione, datiStruttura.nPersoneRiduzione,
                    datiStruttura.esclusioneSoggiorni, datiStruttura.anticipoPrenotazioneMin, datiStruttura.anticipoPrenotazioneMax, datiStruttura.politicaCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw err;
                });
                console.log("inserite condizioni");


                if (datiStruttura.tipologiaStruttura === "B&B") { //query per B&B
                    sql = ('INSERT INTO `b&b` (refstruttura, bambini, ariacondizionata, wifi, riscaldamento, parcheggio, strutturadisabili, animaliammessi, permessofumare, tv, \
                            cucinaceliaci, navettaaereportuale, servizioincamera, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.riscaldamento, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.tv, datiStruttura.cucinaCeliaci,
                        datiStruttura.navettaAeroportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {
                        throw err;
                    });
                    console.log("inserite caratteristiche");
                    for (camera of datiStruttura.camere) {
                        sql = 'INSERT INTO `camerab&b` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES ?';
                        datiQuery = [refStruttura, camera.tipologiaCamera, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoBaseANotte];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw err;
                        });
                    }
                    console.log("camere");
                } else if (datiStruttura.tipologiaStruttura === "cv") {
                    sql = ('INSERT INTO `casavacanze` (refstruttura, bambini, riscaldamento, ariacondizionata, wifi, parcheggio, strutturadisabili, animaliammessi, permessofumare, \
                            festeammesse, tv, salotto, giardino, terrazza, piscina, nbagni, ncamere, nlettisingoli, nlettimatrimoniali, prezzonotte, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.riscaldamento, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.festeAmmesse, datiStruttura.tv, datiStruttura.salotto,
                        datiStruttura.giardino, datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nBagni, datiStruttura.nCamere, datiStruttura.nLettiSingoli, datiStruttura.nLettiMatrimoniali, datiStruttura.prezzoNotte, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]])
                        .then(() => {
                            return callback("ok");
                        })
                        .catch(err => {
                            throw err;
                        });
                    console.log("inserita cv");
                } //chiusura query cv
                return (callback("ok"));
            });
        } //chiuusura tray
        catch (err) {
            console.log(err);
        }
    },

    fetch: async function (callback) {
        let camere;
        let array = [];
        let idStruttura = 1;
        let tipologiaStruttura = "B&B";
        let infoStruttura;
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni generali della struttura
                if (tipologiaStruttura === "cv") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `condizioni` JOIN `casaVacanze` \
                                WHERE `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refStruttura \
                                AND `casaVacanze`.refStruttura=`struttura`.idStruttura', [[[idStruttura]]]).catch(err => {
                        throw err;
                    });
                } else if (tipologiaStruttura === "B&B") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `B&B`\
                WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=3 AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo \
                AND `struttura`.idStruttura=`condizioni`.refStruttura AND `B&B`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune\
                AND `comuni`.refProvincia=`province`.`idProvincia` AND `province`.refRegione=`regioni`.idRegione', [[[idStruttura]]]).catch(err => {
                        throw err;
                    });
                    camere = await db.query(('SELECT * FROM `camerab&b` WHERE `camerab&b`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {
                        throw  err;
                    });
                    for (let i = 0; i < camere.length; i++) {
                        array.push(camere[i]);
                    }
                    console.log("CAMERE")
                    console.log(array)
                    infoStruttura[0]["camere"] = array;

                }
                foto = await db.query(('SELECT `percorso` FROM `fotografie` WHERE  `fotografie`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {
                    throw err;
                });
                array = [];
                for (let i = 0; i < foto.length; i++) {
                    array.push(foto[i].percorso);
                }
                console.log(array);
                array = [];
                let prenotazioni= await db.query(('SELECT * FROM `prenotazione` WHERE  `prenotazione`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {
                    throw err;
                });
                for (let i = 0; i < prenotazioni.length; i++) {
                    array.push(prenotazioni[i].);
                }
                infoStruttura[0]["prenotazioni"] = array;
                console.log(array);
                console.log("INFO STRUTTURA ===");
                console.log(infoStruttura[0]);
                return callback(infoStruttura[0]);
            });
        } catch (err) {
            console.log(err);
        }
    },

    modificaCondizioni: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                console.log("sto per modificare!");
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refstruttura = ?', [`condizioni`, "condizioni.minSoggiorno", struttura.minSoggiorno, "condizioni.maxSoggiorno", struttura.maxSoggiorno, "condizioni.oraInizioCheckIn", struttura.oraInizioCheckIn,
                            "condizioni.oraInizioCheckOut", struttura.oraInizioCheckOut,"condizioni.oraFineCheckIn", struttura.oraFineCheckIn,"condizioni.oraFineCheckOut", struttura.oraFineCheckOut,"condizioni.pagamentoLoco", struttura.pagamentoLoco,
                            "condizioni.pagamentoOnline", struttura.pagamentoOnline,"condizioni.prezzoBambini", struttura.prezzoBambini,"condizioni.prezzoAdulti", struttura.prezzoAdulti,"condizioni.percentualeRiduzione", struttura.percentualeRiduzione,
                            "condizioni.nPersoneRiduzione", struttura.nPersoneRiduzione,"condizioni.esclusioneSoggiorni", struttura.esclusioneSoggiorni,"condizioni.anticipoPrenotazioneMin", struttura.anticipoPrenotazioneMin,"condizioni.anticipoPrenotazioneMax", struttura.anticipoPrenotazioneMax,
                            "condizioni.politicaCancellazione", struttura.politicaCancellazione,"condizioni.penaleCancellazione", struttura.penaleCancellazione,"condizioni.preavvisoDisdetta", struttura.preavvisoDisdetta,
                    1]).catch(err => {throw err;});
                console.log("ho modificato!");
                console.log(results);
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },

    modificaCaratteristicheC: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                console.log("sto per modificare!");
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refstruttura = ?', [`casavacanze`, "casavacanze.bambini", struttura.bambini, "casavacanze.ariaCondizionata", struttura.ariaCondizionata, "casavacanze.Wifi", struttura.Wifi,
                    "casavacanze.parcheggio", struttura.parcheggio,"casavacanze.strutturaDisabili", struttura.strutturaDisabili,"casavacanze.animaliAmmessi", struttura.animaliAmmessi,"casavacanze.permessoFumare", struttura.permessoFumare,
                    "casavacanze.festeAmmesse", struttura.festeAmmesse,"casavacanze.TV", struttura.TV,"casavacanze.salotto", struttura.salotto,"casavacanze.giardino", struttura.giardino,
                    "casavacanze.terrazza", struttura.terrazza,"casavacanze.piscina", struttura.piscina,"casavacanze.nBagni", struttura.nBagni,"casavacanze.nCamere", struttura.nCamere,
                    "casavacanze.nlettiSingoli", struttura.nlettiSingoli,"casavacanze.nlettiMatrimoniali", struttura.nlettiMatrimoniali,"casavacanze.prezzoNotte", struttura.prezzoNotte,"casavacanze.descrizione", struttura.descrizione,
                    1]).catch(err => {throw err;});
                console.log("ho modificato!");
                console.log(results);
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },

    modificaCaratteristicheB: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura= ?', [`b&b`, "b&b.bambini", struttura.bambini, "b&b.ariaCondizionata", struttura.ariaCondizionata, "b&b.wifi", struttura.wifi,
                    "b&b.parcheggio", struttura.parcheggio,"b&b.strutturaDisabili", struttura.strutturaDisabili,"b&b.animaliAmmessi", struttura.animaliAmmessi,"b&b.permessoFumare", struttura.permessoFumare,
                    "b&b.TV", struttura.TV,"b&b.cucinaCeliaci", struttura.cucinaCeliaci,"b&b.navettaAereportuale", struttura.navettaAereportuale,
                    "b&b.servizioInCamera", struttura.servizioInCamera,"b&b.descrizione", struttura.descrizione,1]).catch(err => {throw err;});
                console.log(results);
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },

    modificaDisponibilità:async function (struttura, callback){
        //inserisco nel db i periodi in cui la struttura non è disponibile
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {

            })
        }
        catch (err) {
            console.log(err);
        }
    },

    listaStrutture:async function(callback){
        const db = await makeDb(config);
        let result={};
        let idGestore=3;
        console.log("lista strutture");
        try {
            await withTransaction(db, async () => {
                let results=await db.query(('SELECT * FROM struttura WHERE  struttura.refGestore = ?'),[[[idGestore]]]).catch(err => {
                    throw err;
                });
                return callback(results);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
