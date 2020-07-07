const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');


const StrutturaEntity = require('./StrutturaEntity');
const ListaStrutture = require('./ListaStruttureEntity');


module.exports= {
    inserisciStruttura: async function (datiStruttura, callback) {
        const db = await makeDb(config);
        let results={};
        let refIndirizzo, refStruttura;
        try {
            await withTransaction(db, async () => {
                //inserimento into indirizzo
                let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES ?');
                let datiQuery = [datiStruttura.via, datiStruttura.numeroCivico, datiStruttura.cap, datiStruttura.nomeComune];
                results = await db.query(sql, [[datiQuery]]).catch((err) => {throw createError(500)});

                //se tutto va bene, trovo id indirizzo e inserisco nella struttura
                console.log("Inserito in indirizzo");
                refIndirizzo = results.insertId;
                let giorno = new Date().toISOString().slice(0, 10);
                sql = ('INSERT INTO struttura (nomeStruttura, tipologiaStruttura, refGestore, refIndirizzo, rendicontoEffettuato) VALUES ?');

                datiQuery = [datiStruttura.nomeStruttura, datiStruttura.tipologiaStruttura, datiStruttura.idUtente, refIndirizzo, giorno];
                results = await db.query(sql, [[datiQuery]]).catch((err) => {throw err});

                console.log('Inserito nella tabella struttura');
                refStruttura = results.insertId;
                sql = ('INSERT INTO `fotografie` (refStruttura, percorso) VALUES ?');
                if (datiStruttura.foto) {
                    for (foto of datiStruttura.foto) {
                        datiQuery = [refStruttura, foto];
                        results = await db.query(sql, [[datiQuery]]).catch((err) => {throw createError(500)});
                    }
                    console.log("Inserite foto");
                }//end for

                sql = ('INSERT INTO `condizioni` (refStruttura, minSoggiorno, maxSoggiorno, oraInizioCheckIn, oraInizioCheckOut, oraFineCheckIn, \
                            oraFineCheckOut,pagamentoLoco,pagamentoOnline, prezzoBambini, prezzoAdulti, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            politicaCancellazione, penaleCancellazione, preavvisoDisdetta) VALUES ?');
                datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti,
                    datiStruttura.anticipoPrenotazioneMin, datiStruttura.anticipoPrenotazioneMax, datiStruttura.politicaCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                results = await db.query(sql, [[datiQuery]]).catch((err) => {throw createError(500)});

                console.log("inserite condizioni");
                if (datiStruttura.tipologiaStruttura === "B&B") { //query per b&b
                    sql = ('INSERT INTO `b&b` (refstruttura, bambini, ariacondizionata, wifi, riscaldamento, parcheggio, strutturadisabili, animaliammessi, permessofumare, tv, \
                            cucinaceliaci, navettaAeroportuale, servizioincamera, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.riscaldamento, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.TV, datiStruttura.cucinaCeliaci,
                        datiStruttura.navettaAeroportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch((err) => {throw createError(500)});

                    console.log("Inserito b&b");
                    for (camera of datiStruttura.camere) {
                        sql = 'INSERT INTO `camerab&b` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES ?';
                        datiQuery = [refStruttura, camera.tipologiaCamera, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoBaseANotte];
                        results = await db.query(sql, [[datiQuery]]).catch((err) => {throw createError(500)});
                    }
                    console.log("Inserite camere");
                } else if (datiStruttura.tipologiaStruttura === "cv") {
                    sql = ('INSERT INTO `casavacanze` (refstruttura, bambini, riscaldamento, ariacondizionata, wifi, parcheggio, strutturadisabili, animaliammessi, permessofumare, \
                            festeammesse, tv, salotto, giardino, terrazza, piscina, nbagni, ncamere, nlettisingoli, nlettimatrimoniali, prezzonotte, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.riscaldamento, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.festeAmmesse, datiStruttura.tv, datiStruttura.salotto,
                        datiStruttura.giardino, datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nBagni, datiStruttura.nCamere, datiStruttura.nLettiSingoli, datiStruttura.nLettiMatrimoniali, datiStruttura.prezzoNotte, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch((err) => {throw createError(500)});

                    console.log("Inserita CV");
                } //chiusura query cv

                results = await db.query(('SELECT struttura.*, indirizzo.*, autenticazione.email as emailGestore FROM struttura JOIN indirizzo JOIN autenticazione WHERE struttura.refGestore = ? AND struttura.refIndirizzo=indirizzo.idIndirizzo AND autenticazione.refUtente=struttura.refGestore'), [datiStruttura.idUtente])
                    .catch((err) => {throw createError(500)});
                return callback(results);
            });
        } //chiusura try
        catch (err) {
            console.log(err);
        }
    },

    fetch: async function (dati, callback) {
        let camere;
        let array = [];
        let idStruttura = dati.idStruttura;
        let tipologiaStruttura = dati.tipologiaStruttura;
        let refGestore = dati.refGestore;
        let infoStruttura;
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni generali della struttura
                if (tipologiaStruttura === "cv") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `casavacanze` \
                        WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refStruttura \
                        AND `casavacanze`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune AND `comuni`.refProvincia=`province`.`idProvincia` \
                        AND `province`.refRegione=`regioni`.idRegione', [idStruttura, refGestore]).catch((err) => {throw createError(500)});
                } else if (tipologiaStruttura === "B&B") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `b&b`\
                WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo \
                AND `struttura`.idStruttura=`condizioni`.refStruttura AND `b&b`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune\
                AND `comuni`.refProvincia=`province`.`idProvincia` AND `province`.refRegione=`regioni`.idRegione', [idStruttura, refGestore]).catch((err) => {throw createError(500)});

                    camere = await db.query(('SELECT * FROM `camerab&b` WHERE `camerab&b`.refStruttura = ?'), [[[idStruttura]]]).catch((err) => {throw createError(500)});
                    for (let i = 0; i < camere.length; i++) {
                        array.push(camere[i]);
                    }
                    infoStruttura[0]["camere"] = array;
                }
                foto = await db.query(('SELECT `percorso` FROM `fotografie` WHERE  `fotografie`.refStruttura = ?'), [[[idStruttura]]])
                    .catch((err) => {throw createError(500)});

                array = [];
                for (let i = 0; i < foto.length; i++) {
                    array.push(foto[i].percorso);
                }
                infoStruttura[0]["foto"] = array;
                array = [];
                return callback(infoStruttura[0]);
            });
        } catch (err) {
            throw err;
        }
    },

    modificaCondizioni: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura = ?', ["condizioni", "condizioni.minSoggiorno", struttura.minSoggiorno, "condizioni.maxSoggiorno", struttura.maxSoggiorno, "condizioni.oraInizioCheckIn", struttura.oraInizioCheckIn,
                    "condizioni.oraInizioCheckOut", struttura.oraInizioCheckOut,"condizioni.oraFineCheckIn", struttura.oraFineCheckIn,"condizioni.oraFineCheckOut", struttura.oraFineCheckOut,"condizioni.pagamentoLoco", struttura.pagamentoLoco,
                    "condizioni.pagamentoOnline", struttura.pagamentoOnline,"condizioni.prezzoBambini", struttura.prezzoBambini,"condizioni.prezzoAdulti", struttura.prezzoAdulti,
                    "condizioni.anticipoPrenotazioneMin", struttura.anticipoPrenotazioneMin,"condizioni.anticipoPrenotazioneMax", struttura.anticipoPrenotazioneMax,
                    "condizioni.politicaCancellazione", struttura.politicaCancellazione,"condizioni.penaleCancellazione", struttura.penaleCancellazione,"condizioni.preavvisoDisdetta", struttura.preavvisoDisdetta,
                    struttura.idStruttura]).catch((err) => {throw createError(500)});
                return callback(results);
            });
        } catch (err) {
            throw err;
        }
    },

    modificaCaratteristicheB: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura= ?', ["b&b", "b&b.bambini", struttura.bambini, "b&b.ariaCondizionata", struttura.ariaCondizionata, "b&b.wifi", struttura.wifi,
                    "b&b.parcheggio", struttura.parcheggio,"b&b.strutturaDisabili", struttura.strutturaDisabili,"b&b.animaliAmmessi", struttura.animaliAmmessi,"b&b.permessoFumare", struttura.permessoFumare,
                    "b&b.TV", struttura.TV,"b&b.cucinaCeliaci", struttura.cucinaCeliaci,"b&b.navettaAeroportuale", struttura.navettaAeroportuale,
                    "b&b.servizioInCamera", struttura.servizioInCamera,"b&b.descrizione", struttura.descrizione, "b&b.riscaldamento", struttura.riscaldamento,struttura.idStruttura]).catch((err) => {throw createError(500)});
                return callback(results);
            });
        } catch (err) {
            throw err;
        }
    },

    modificaCaratteristicheC: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura = ?', ["casavacanze", "casavacanze.bambini", struttura.bambini, "casavacanze.ariaCondizionata",struttura.ariaCondizionata, "casavacanze.riscaldamento", struttura.riscaldamento, "casavacanze.Wifi", struttura.Wifi,
                    "casavacanze.parcheggio", struttura.parcheggio,"casavacanze.strutturaDisabili", struttura.strutturaDisabili,"casavacanze.animaliAmmessi", struttura.animaliAmmessi,"casavacanze.permessoFumare", struttura.permessoFumare,
                    "casavacanze.festeAmmesse", struttura.festeAmmesse,"casavacanze.TV", struttura.TV, "casavacanze.descrizione", struttura.descrizione, struttura.idStruttura]).catch((err) => {throw createError(500)});
                return callback(results);
            });
        } catch (err) {
            throw err;
        }
    },

    carica: async function(idStruttura, callback) {
        let struttura = new StrutturaEntity(idStruttura);
        await struttura.init();
        return callback(struttura);
    },

    cerca: async function(datiRicerca, callback) {
        let listaStrutture = new ListaStrutture(datiRicerca.destinazione, datiRicerca.arrivo, datiRicerca.partenza, datiRicerca.ospiti, datiRicerca.bedAndBreakfast, datiRicerca.casavacanze);
        await listaStrutture.init();
        return callback(listaStrutture);
    },

    listaStrutture:async function(idGestore,callback){
        const db = await makeDb(config)
        console.log("id",idGestore);
        try {
            await withTransaction(db, async () => {
                let results=await db.query(('SELECT * FROM struttura JOIN indirizzo WHERE struttura.refGestore = ? AND struttura.refIndirizzo=indirizzo.idIndirizzo '),[idGestore])
                    .catch((err) => {throw createError(500)});
                return callback(results);
            });
        }
        catch (err) {
            throw err;
        }
    },

    calcoloGuadagno: async function(dati, callback){
        const db = await makeDb(config);
        let dataInizio=dati.dataInizio;
        let dataFine= dati.dataFine;
        let idStruttura = dati.idStruttura;
        try {
            await withTransaction(db, async () => {
                risultato = await db.query(('SELECT * FROM prenotazione JOIN condizioni WHERE `prenotazione`.refStruttura=? AND `prenotazione`.refStruttura = `condizioni`.refStruttura \
            AND prenotazione.confermata=1 AND (prenotazione.checkIn >= ? AND prenotazione.checkIn<=?) AND (prenotazione.checkOut >= ? AND prenotazione.checkOut<=?)'),
                    [idStruttura, dataInizio, dataFine, dataInizio, dataFine]).catch((err) => {throw createError(500)});
                return callback(risultato);
            })
        }
        catch (err) {
            throw err;
        }
    },

    fetchStruttura: async function(dati, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(('SELECT S.idStruttura, S.nomeStruttura, R.nomeRegione as regione, P.nomeProvincia as provincia,\
                     C.nomeComune as comune, I.via, I.numeroCivico, I.cap, CO.prezzoAdulti, CO.prezzoBambini FROM regioni as R, province as P,comuni as C, indirizzo as I,struttura as S, condizioni AS CO\
                   WHERE S.idStruttura = ? AND S.idStruttura = CO.refStruttura AND S.refIndirizzo = I.idIndirizzo AND I.refComune = C.idComune AND C.refProvincia = P.idProvincia AND P.refRegione = R.idRegione'),
                    [dati.idStruttura]).catch((err) => {throw err});
                return callback(risultato);
            })
        }
        catch (err) {
            throw err;
        }

    },

    setDataRendiconto: async function (info, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE struttura SET struttura.rendicontoEffettuato = ? WHERE idStruttura = ?',
                    [info.rendiconto, info.idStruttura])
                    .catch(err => {console.log(err)});
                return callback(results);
            });
        } catch (err) {
            throw err;
        }
    }

};


