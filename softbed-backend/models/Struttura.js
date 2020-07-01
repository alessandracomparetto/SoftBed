/*Model della struttura*/
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');



module.exports= {
    inserisciStruttura: async function (datiStruttura, callback) {
        const db = await makeDb(config);
        let results = {};
        let refIndirizzo;
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
                            oraFineCheckOut,pagamentoLoco,pagamentoOnline, prezzoBambini, prezzoAdulti, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            politicaCancellazione, penaleCancellazione, preavvisoDisdetta) VALUES ?');
                datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti,
                    datiStruttura.anticipoPrenotazioneMin, datiStruttura.anticipoPrenotazioneMax, datiStruttura.politicaCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw err;
                });
                console.log("inserite condizioni");

                if (datiStruttura.tipologiaStruttura === "B&B") { //query per B&B
                    sql = ('INSERT INTO `B&B` (refstruttura, bambini, ariacondizionata, wifi, riscaldamento, parcheggio, strutturadisabili, animaliammessi, permessofumare, tv, \
                            cucinaceliaci, navettaAeroportuale, servizioincamera, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.riscaldamento, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.tv, datiStruttura.cucinaCeliaci,
                        datiStruttura.navettaAeroportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {
                        throw err;
                    });
                    console.log("inserite caratteristiche");
                    for (camera of datiStruttura.camere) {
                        sql = 'INSERT INTO `cameraB&B` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES ?';
                        datiQuery = [refStruttura, camera.tipologiaCamera, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoBaseANotte];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw err;
                        });
                    }
                    console.log("camere");
                } else if (datiStruttura.tipologiaStruttura === "cv") {
                    sql = ('INSERT INTO `casaVacanze` (refstruttura, bambini, riscaldamento, ariacondizionata, wifi, parcheggio, strutturadisabili, animaliammessi, permessofumare, \
                            festeammesse, tv, salotto, giardino, terrazza, piscina, nbagni, ncamere, nlettisingoli, nlettimatrimoniali, prezzonotte, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.riscaldamento, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.festeAmmesse, datiStruttura.tv, datiStruttura.salotto,
                        datiStruttura.giardino, datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nBagni, datiStruttura.nCamere, datiStruttura.nLettiSingoli, datiStruttura.nLettiMatrimoniali, datiStruttura.prezzoNotte, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {throw err;});
                    console.log("inserita cv");
                } //chiusura query cv

                await this.listaStrutture(function (data) {
                    return (callback(data));
                })
            });
        } //chiusura try
        catch (err) {
            console.log(err);
        }
    },

    fetch: async function (ID, dati, callback) {
        let camere;
        let array = [];
        let idStruttura = ID;
        let tipologiaStruttura = dati.tipologiaStruttura;
        let refGestore = dati.refGestore;
        let infoStruttura;
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni generali della struttura
                if (tipologiaStruttura === "cv") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `casaVacanze` \
                        WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refStruttura \
                        AND `casaVacanze`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune AND `comuni`.refProvincia=`province`.`idProvincia` \
                        AND `province`.refRegione=`regioni`.idRegione', [idStruttura, refGestore]).catch(err => {throw err;});
                } else if (tipologiaStruttura === "B&B") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `B&B`\
                WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo \
                AND `struttura`.idStruttura=`condizioni`.refStruttura AND `B&B`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune\
                AND `comuni`.refProvincia=`province`.`idProvincia` AND `province`.refRegione=`regioni`.idRegione', [idStruttura, refGestore]).catch(err => {throw err;});

                    camere = await db.query(('SELECT * FROM `cameraB&B` WHERE `cameraB&B`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {throw  err;});
                    for (let i = 0; i < camere.length; i++) {
                        array.push(camere[i]);
                    }
                    /*console.log("CAMERE")
                    console.log(array);*/
                    infoStruttura[0]["camere"] = array;
                }
                foto = await db.query(('SELECT `percorso` FROM `fotografie` WHERE  `fotografie`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {
                    throw err;
                });
                array = [];
                for (let i = 0; i < foto.length; i++) {
                    array.push(foto[i].percorso);
                }
                infoStruttura[0]["foto"] = array
                array = [];
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
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura = ?', [`condizioni`, "condizioni.minSoggiorno", struttura.minSoggiorno, "condizioni.maxSoggiorno", struttura.maxSoggiorno, "condizioni.oraInizioCheckIn", struttura.oraInizioCheckIn,
                            "condizioni.oraInizioCheckOut", struttura.oraInizioCheckOut,"condizioni.oraFineCheckIn", struttura.oraFineCheckIn,"condizioni.oraFineCheckOut", struttura.oraFineCheckOut,"condizioni.pagamentoLoco", struttura.pagamentoLoco,
                            "condizioni.pagamentoOnline", struttura.pagamentoOnline,"condizioni.prezzoBambini", struttura.prezzoBambini,"condizioni.prezzoAdulti", struttura.prezzoAdulti,
                            "condizioni.anticipoPrenotazioneMin", struttura.anticipoPrenotazioneMin,"condizioni.anticipoPrenotazioneMax", struttura.anticipoPrenotazioneMax,
                            "condizioni.politicaCancellazione", struttura.politicaCancellazione,"condizioni.penaleCancellazione", struttura.penaleCancellazione,"condizioni.preavvisoDisdetta", struttura.preavvisoDisdetta,
                    struttura.idStruttura]).catch(err => {throw err;});
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
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refstruttura = ?', [`casavacanze`, "casavacanze.bambini", struttura.bambini, "casavacanze.ariaCondizionata",struttura.ariaCondizionata, "casavacanze.riscaldamento", struttura.riscaldamento, "casavacanze.Wifi", struttura.Wifi,
                    "casavacanze.parcheggio", struttura.parcheggio,"casavacanze.strutturaDisabili", struttura.strutturaDisabili,"casavacanze.animaliAmmessi", struttura.animaliAmmessi,"casavacanze.permessoFumare", struttura.permessoFumare,
                    "casavacanze.festeAmmesse", struttura.festeAmmesse,"casavacanze.TV", struttura.TV, "casavacanze.descrizione", struttura.descrizione, 2]).catch(err => {throw err;});
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },


    carica: async function(idStruttura, callback) {

        const db = await makeDb(config);
        let struttura = {};

        let queryStruttura = `SELECT struttura.nomeStruttura, struttura.tipologiaStruttura
            FROM struttura
            WHERE struttura.idStruttura = ?`

        let queryLocalita = `SELECT R.nomeRegione as regione, P.nomeProvincia as provincia, C.nomeComune as comune, I.via, I.numeroCivico, I.numeroCivico
            FROM regioni as R, province as P, comuni as C, indirizzo as I, struttura as S
            WHERE S.idStruttura = ?
                AND S.refIndirizzo = I.idIndirizzo
                AND I.refComune = C.idComune
                AND C.refProvincia = P.idProvincia
                AND P.refRegione = R.idRegione`

        let queryFoto = `SELECT fotografie.percorso
            FROM fotografie
            WHERE fotografie.refStruttura = ?`
        
        // B&B
        let queryPrezzoBB = `SELECT CBB.tipologiaCamera, MIN(CBB.prezzoBaseANotte) as prezzo
            FROM \`cameraB&B\` as CBB, \`B&B\` as BB
            WHERE BB.refStruttura = ?
                AND BB.refStruttura = CBB.refStruttura
            GROUP BY CBB.tipologiaCamera`

        let queryDescrizioneBB = `SELECT BB.descrizione
                                  FROM \`B&B\` as BB
                                  WHERE BB.refStruttura = ?`

        let queryServiziBB = `SELECT BB.bambini, BB.ariaCondizionata, BB.wifi, BB.riscaldamento, BB.parcheggio, 
                BB.strutturaDisabili, BB.animaliAmmessi, BB.permessoFumare, BB.TV, BB.cucinaCeliaci,
                BB.navettaAeroportuale, BB.servizioInCamera
            FROM \`B&B\` as BB
            WHERE BB.refStruttura = ?`

        // CV
        let queryPrezzoCV = `SELECT CV.prezzoNotte
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        let queryDescrizioneCV = `SELECT CV.descrizione
                                  FROM casaVacanze as CV
                                  WHERE CV.refStruttura = ?`

        let queryServiziCV = `SELECT CV.bambini, CV.riscaldamento, CV.ariaCondizionata, CV.wifi, CV.parcheggio,
                CV.strutturaDisabili, CV.animaliAmmessi, CV.permessoFumare, CV.festeAmmesse, CV.TV
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        let queryAmbientiCV = `SELECT CV.salotto, CV.giardino, CV.terrazza, CV.piscina
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        let queryBagniCamereLetti = `SELECT CV.nBagni as bagni, CV.nCamere as camere, CV.nLettiSingoli as singoli, CV.nLettiMatrimoniali as matrimoniali
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        try {
            await withTransaction(db, async () => {

                let risultato = await db.query(queryStruttura, [idStruttura]).catch(() => {throw createError(500)});

                struttura = risultato[0];

                let fotografie = await db.query(queryFoto, idStruttura).catch(() => {throw createError(500)});
                let localita = await db.query(queryLocalita, idStruttura).catch(() => {throw createError(500)});

                let prezzoBB = await db.query(queryPrezzoBB, idStruttura).catch(() => {throw createError(500)});
                let prezzoCV = await db.query(queryPrezzoCV, idStruttura).catch(() => {throw createError(500)});

                let descrizione = "";
                let servizi = [];

                // Caso B&B
                if (prezzoBB[0]) {
                    descrizione = await db.query(queryDescrizioneBB, idStruttura).catch(() => {throw createError(500)});
                    servizi = await db.query(queryServiziBB, idStruttura).catch(() => {throw createError(500)});
                    
                    // Aggiunta a struttura
                    struttura.prezzo = prezzoBB // array di oggetti {tipologiaStanza, prezzo}
                }

                // Caso CV
                else if (prezzoCV[0]) {
                    descrizione = await db.query(queryDescrizioneCV, idStruttura).catch(() => {throw createError(500)});

                    servizi = await db.query(queryServiziCV, idStruttura).catch(() => {throw createError(500)});
                    let ambienti = await db.query(queryAmbientiCV, idStruttura).catch(() => {throw createError(500)});
                    let bagniCamereLetti = await db.query(queryBagniCamereLetti, idStruttura).catch(() => {throw createError(500)});

                    // Aggiunta a struttura
                    struttura.prezzo = prezzoCV[0]; // number

                    struttura.ambienti = Object.keys(ambienti[0])
                        .reduce(function(risultato, ambiente) {
                            if (ambienti[0][ambiente] === 1) {
                                risultato.push(ambiente);
                            }

                            return risultato;
                        }, []);

                    struttura.bagni = bagniCamereLetti[0].bagni;
                    struttura.camere = bagniCamereLetti[0].camere;
                    struttura.lettiSingoli = bagniCamereLetti[0].singoli;
                    struttura.lettiMatrimoniali = bagniCamereLetti[0].matrimoniali;
                }

                // Struttura non trovata o informazioni obbligatorie mancanti
                else throw createError(404);

                // Aggiunta di informazioni dello stesso tipo
                struttura.descrizione = descrizione[0].descrizione;

                struttura.servizi = Object.keys(servizi[0])
                    .reduce(function(risultato, servizio) {
                        if (servizi[0][servizio] === 1) {
                            risultato.push(servizio);
                        }

                        return risultato;
                    }, []);

                struttura.foto = fotografie.map((oggetto) => {return oggetto.percorso});
                struttura.localita = localita[0];

                console.log(struttura);
                return callback(struttura);
            })
        } catch(err) {
            throw err;
        }
    },

    cerca: async function(datiRicerca, callback) {

        const db = await makeDb(config);

        // Strutture che si trovano nella zona cercata
        let queryDestinazione = `SELECT struttura.idStruttura 
        FROM struttura, indirizzo 
        WHERE 
        struttura.refIndirizzo = indirizzo.idIndirizzo AND 
        indirizzo.refComune IN (
            SELECT comuni.idComune
            FROM comuni, province, regioni 
            WHERE 
            comuni.refProvincia = province.idProvincia AND 
            province.refRegione = regioni.idRegione AND ( 
                comuni.nomeComune = "${datiRicerca.destinazione}" OR 
                province.nomeProvincia = "${datiRicerca.destinazione}" OR 
                regioni.nomeRegione = "${datiRicerca.destinazione}" 
            )
        )`;

        // CV: CV che non abbiano prenotazioni nel periodo selezionato e con abbastanza letti
        let queryPrenotazioniCV = `SELECT CV.refStruttura
        FROM casaVacanze as CV 
        WHERE 
        (CV.nLettiSingoli + 2 * CV.nLettiMatrimoniali) >= ${datiRicerca.ospiti} AND 
        CV.refStruttura NOT IN ( 
            SELECT prenotazione.refStruttura 
            FROM prenotazione 
            WHERE 
            ("${datiRicerca.arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
            ("${datiRicerca.partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
            ("${datiRicerca.arrivo}" <= prenotazione.checkIn AND "${datiRicerca.partenza}" >= prenotazione.checkOut)
        )`

        // B&B: B&B con almeno una camera disponibile che abbia abbastanza letti
        let queryPrenotazioniBB = `SELECT DISTINCT CBB1.refStruttura
        FROM \`cameraB&B\` as CBB1
        WHERE 
        (CBB1.nLettiSingoli + 2 * CBB1.nLettiMatrimoniali) >= ${datiRicerca.ospiti} AND 
        (CBB1.refStruttura, CBB1.idCamera) NOT IN ( 
            SELECT DISTINCT CBB2.refStruttura, CBB2.idCamera 
            FROM \`cameraB&B\` as CBB2, prenotazioneCamera, prenotazione 
            WHERE 
            CBB2.idCamera = prenotazioneCamera.refCamera AND 
            CBB2.refStruttura = prenotazioneCamera.refStruttura AND 
            prenotazioneCamera.refPrenotazione = prenotazione.idPrenotazione AND 
            prenotazioneCamera.refStruttura = prenotazione.refStruttura AND ( 
                ("${datiRicerca.arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                ("${datiRicerca.partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR 
                ("${datiRicerca.arrivo}" < prenotazione.checkIn AND "${datiRicerca.partenza}" > prenotazione.checkOut) 
            )
        )`

        let query;
        // Solo case vacanze
        if (datiRicerca.bedAndBreakfast !== "true") {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura
            FROM struttura 
            WHERE 
            struttura.idStruttura IN (${queryDestinazione}) AND 
            struttura.idStruttura IN (${queryPrenotazioniCV})`
        }

        // Solo bed and breakfast
        else if (datiRicerca.casaVacanze !== "true") {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura 
            FROM struttura 
            WHERE 
            struttura.idStruttura IN (${queryDestinazione}) AND  
            struttura.idStruttura IN (${queryPrenotazioniBB})`
        }

        // Sia case vacanze che B&B
        else {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura
            FROM struttura
            WHERE
                struttura.idStruttura IN (${queryDestinazione}) AND (
                    (struttura.idStruttura IN (${queryPrenotazioniBB})) OR 
                    (struttura.idStruttura IN (${queryPrenotazioniCV}))
            )`
        }

        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(query, []).catch((err) => {throw createError(500)});
                return callback(risultato);
            })
        } catch (err) {
            throw err;
        }

    },


    modificaCaratteristicheB: async function (struttura, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura= ?', [`b&b`, "b&b.bambini", struttura.bambini, "b&b.ariaCondizionata", struttura.ariaCondizionata, "b&b.wifi", struttura.wifi,
                    "b&b.parcheggio", struttura.parcheggio,"b&b.strutturaDisabili", struttura.strutturaDisabili,"b&b.animaliAmmessi", struttura.animaliAmmessi,"b&b.permessoFumare", struttura.permessoFumare,
                    "b&b.TV", struttura.TV,"b&b.cucinaCeliaci", struttura.cucinaCeliaci,"b&b.navettaAeroportuale", struttura.navettaAeroportuale,
                    "b&b.servizioInCamera", struttura.servizioInCamera,"b&b.descrizione", struttura.descrizione,struttura.idStruttura]).catch(err => {throw err;});
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },

    listaStrutture:async function(callback){
        const db = await makeDb(config);
        let idGestore=1; /*TODO:sistemare gestore*/
        try {
            await withTransaction(db, async () => {
                let results=await db.query(('SELECT * FROM struttura JOIN indirizzo WHERE struttura.refGestore = ? AND struttura.refIndirizzo=indirizzo.idIndirizzo '),[idGestore]).catch(err => {
                    throw err;
                });
                return callback(results);
            });
        }
        catch (err) {
            console.log(err);
        }
    },

    calcoloGuadagno: async function(dati, callback){
        const db = await makeDb(config);
        let idGestore=dati.refGestore;
        let dataInizio=dati.dataInizio;
        let dataFine= dati.dataFine;
        let idStruttura = dati.idStruttura;
        try {
            risultato = await db.query(('SELECT * FROM prenotazione JOIN condizioni WHERE `prenotazione`.refStruttura=? AND `prenotazione`.refStruttura = `condizioni`.refStruttura \
            AND prenotazione.confermata=1 AND (prenotazione.checkIn >= ? AND prenotazione.checkIn<=?) AND (prenotazione.checkOut >= ? AND prenotazione.checkOut<=?)'),
                [idStruttura, dataInizio, dataFine, dataInizio, dataFine]).catch(err=>{throw err});
            return callback(risultato);
        }
        catch (err) {
            console.log(err);
        }
    }
};




/*/!*Model della struttura*!/
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');



module.exports= {
    inserisciStruttura: async function (datiStruttura, callback) {
        const db = await makeDb(config);
        let results = {};
        let refIndirizzo;
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
                            oraFineCheckOut,pagamentoLoco,pagamentoOnline, prezzoBambini, prezzoAdulti, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            politicaCancellazione, penaleCancellazione, preavvisoDisdetta) VALUES ?');
                datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti,
                     datiStruttura.anticipoPrenotazioneMin, datiStruttura.anticipoPrenotazioneMax, datiStruttura.politicaCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                results = await db.query(sql, [[datiQuery]]).catch(err => {
                    throw err;
                });
                console.log("inserite condizioni");

                if (datiStruttura.tipologiaStruttura === "B&B") { //query per B&B
                    sql = ('INSERT INTO `B&B` (refstruttura, bambini, ariacondizionata, wifi, riscaldamento, parcheggio, strutturadisabili, animaliammessi, permessofumare, tv, \
                            cucinaceliaci, navettaAeroportuale, servizioincamera, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.riscaldamento, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.tv, datiStruttura.cucinaCeliaci,
                        datiStruttura.navettaAeroportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {
                        throw err;
                    });
                    console.log("inserite caratteristiche");
                    for (camera of datiStruttura.camere) {
                        sql = 'INSERT INTO `cameraB&B` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES ?';
                        datiQuery = [refStruttura, camera.tipologiaCamera, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoBaseANotte];
                        results = await db.query(sql, [[datiQuery]]).catch(err => {
                            throw err;
                        });
                    }
                    console.log("camere");
                } else if (datiStruttura.tipologiaStruttura === "cv") {
                    sql = ('INSERT INTO `casaVacanze` (refstruttura, bambini, riscaldamento, ariacondizionata, wifi, parcheggio, strutturadisabili, animaliammessi, permessofumare, \
                            festeammesse, tv, salotto, giardino, terrazza, piscina, nbagni, ncamere, nlettisingoli, nlettimatrimoniali, prezzonotte, descrizione) VALUES ?');
                    datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.riscaldamento, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                        datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.festeAmmesse, datiStruttura.tv, datiStruttura.salotto,
                        datiStruttura.giardino, datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nBagni, datiStruttura.nCamere, datiStruttura.nLettiSingoli, datiStruttura.nLettiMatrimoniali, datiStruttura.prezzoNotte, datiStruttura.descrizione];
                    results = await db.query(sql, [[datiQuery]]).catch(err => {throw err;});
                    console.log("inserita cv");
                } //chiusura query cv

                await this.listaStrutture(function (data) {
                    return (callback(data));
                })
            });
        } //chiusura try
        catch (err) {
            console.log(err);
        }
    },

    fetch: async function (ID, dati, callback) {
        let camere;
        let array = [];
        let idStruttura = ID;
        let tipologiaStruttura = dati.tipologiaStruttura;
        let refGestore = dati.refGestore;
        let infoStruttura;
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni generali della struttura
                if (tipologiaStruttura === "cv") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `casaVacanze` \
                        WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refStruttura \
                        AND `casaVacanze`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune AND `comuni`.refProvincia=`province`.`idProvincia` \
                        AND `province`.refRegione=`regioni`.idRegione', [idStruttura, refGestore]).catch(err => {throw err;});
                } else if (tipologiaStruttura === "B&B") {
                    infoStruttura = await db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `B&B`\
                WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo \
                AND `struttura`.idStruttura=`condizioni`.refStruttura AND `B&B`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune\
                AND `comuni`.refProvincia=`province`.`idProvincia` AND `province`.refRegione=`regioni`.idRegione', [idStruttura, refGestore]).catch(err => {throw err;});

                    camere = await db.query(('SELECT * FROM `cameraB&B` WHERE `cameraB&B`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {throw  err;});
                    for (let i = 0; i < camere.length; i++) {
                        array.push(camere[i]);
                    }
                    /!*console.log("CAMERE")
                    console.log(array);*!/
                    infoStruttura[0]["camere"] = array;
                }
                foto = await db.query(('SELECT `percorso` FROM `fotografie` WHERE  `fotografie`.refStruttura = ?'), [[[idStruttura]]]).catch(err => {
                    throw err;
                });
                array = [];
                for (let i = 0; i < foto.length; i++) {
                    array.push(foto[i].percorso);
                }
                infoStruttura[0]["foto"] = array
                array = [];
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
                let results = await db.query('UPDATE condizioni SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refStruttura = ?', ["condizioni.minSoggiorno", struttura.minSoggiorno, "condizioni.maxSoggiorno", struttura.maxSoggiorno, "condizioni.oraInizioCheckIn", struttura.oraInizioCheckIn,
                            "condizioni.oraInizioCheckOut", struttura.oraInizioCheckOut,"condizioni.oraFineCheckIn", struttura.oraFineCheckIn,"condizioni.oraFineCheckOut", struttura.oraFineCheckOut,"condizioni.pagamentoLoco", struttura.pagamentoLoco,
                            "condizioni.pagamentoOnline", struttura.pagamentoOnline,"condizioni.prezzoBambini", struttura.prezzoBambini,"condizioni.prezzoAdulti", struttura.prezzoAdulti,"condizioni.percentualeRiduzione", struttura.percentualeRiduzione,
                            "condizioni.nPersoneRiduzione", struttura.nPersoneRiduzione,"condizioni.esclusioneSoggiorni", struttura.esclusioneSoggiorni,"condizioni.anticipoPrenotazioneMin", struttura.anticipoPrenotazioneMin,"condizioni.anticipoPrenotazioneMax", struttura.anticipoPrenotazioneMax,
                            "condizioni.politicaCancellazione", struttura.politicaCancellazione,"condizioni.penaleCancellazione", struttura.penaleCancellazione,"condizioni.preavvisoDisdetta", struttura.preavvisoDisdetta,
                    2]).catch(err => {throw err;});
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
                let results = await db.query('UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? \
                         WHERE refstruttura = ?', [`casavacanze`, "casavacanze.bambini", struttura.bambini, "casavacanze.ariaCondizionata",struttura.ariaCondizionata, "casavacanze.riscaldamento", struttura.riscaldamento, "casavacanze.Wifi", struttura.Wifi,
                    "casavacanze.parcheggio", struttura.parcheggio,"casavacanze.strutturaDisabili", struttura.strutturaDisabili,"casavacanze.animaliAmmessi", struttura.animaliAmmessi,"casavacanze.permessoFumare", struttura.permessoFumare,
                    "casavacanze.festeAmmesse", struttura.festeAmmesse,"casavacanze.TV", struttura.TV, "casavacanze.descrizione", struttura.descrizione, 2]).catch(err => {throw err;});
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },


    carica: async function(idStruttura, callback) {

        const db = await makeDb(config);
        let struttura = {};

        let queryStruttura = `SELECT struttura.nomeStruttura, struttura.tipologiaStruttura
            FROM struttura
            WHERE struttura.idStruttura = ?`

        let queryLocalita = `SELECT R.nomeRegione as regione, P.nomeProvincia as provincia, C.nomeComune as comune, I.via, I.numeroCivico, I.numeroCivico
            FROM regioni as R, province as P, comuni as C, indirizzo as I, struttura as S
            WHERE S.idStruttura = ?
                AND S.refIndirizzo = I.idIndirizzo
                AND I.refComune = C.idComune
                AND C.refProvincia = P.idProvincia
                AND P.refRegione = R.idRegione`

        let queryFoto = `SELECT fotografie.percorso
            FROM fotografie
            WHERE fotografie.refStruttura = ?`

        // B&B
        let queryPrezzoBB = `SELECT CBB.tipologiaCamera, MIN(CBB.prezzoBaseANotte) as prezzo
            FROM \`cameraB&B\` as CBB, \`B&B\` as BB
            WHERE BB.refStruttura = ?
                AND BB.refStruttura = CBB.refStruttura
            GROUP BY CBB.tipologiaCamera`

        let queryServiziBB = `SELECT BB.bambini, BB.ariaCondizionata, BB.wifi, BB.riscaldamento, BB.parcheggio,
                BB.strutturaDisabili, BB.animaliAmmessi, BB.permessoFumare, BB.TV, BB.cucinaCeliaci,
                BB.navettaAeroportuale, BB.servizioInCamera, BB.descrizione
            FROM \`B&B\` as BB
            WHERE BB.refStruttura = ?`

        // CV
        let queryPrezzoCV = `SELECT CV.prezzoNotte
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        let queryServiziCV = `SELECT CV.bambini, CV.riscaldamento, CV.ariaCondizionata, CV.wifi, CV.parcheggio,
                CV.strutturaDisabili, CV.animaliAmmessi, CV.permessoFumare, CV.festeAmmesse, CV.TV
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        let queryAmbientiCV = `SELECT CV.salotto, CV.giardino, CV.terrazza, CV.piscina
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        let queryBagniCamereLetti = `SELECT CV.nBagni as bagni, CV.nCamere as camere, CV.nLettiSingoli as singoli, CV.nLettiMatrimoniali as matrimoniali
            FROM casaVacanze as CV
            WHERE CV.refStruttura = ?`

        try {
            await withTransaction(db, async () => {

                let risultato = await db.query(queryStruttura, [idStruttura]).catch(() => {throw createError(500)});

                struttura = risultato[0];

                let fotografie = await db.query(queryFoto, idStruttura).catch(() => {throw createError(500)});
                let localita = await db.query(queryLocalita, idStruttura).catch(() => {throw createError(500)});

                let prezzoBB = await db.query(queryPrezzoBB, idStruttura).catch(() => {throw createError(500)});
                let prezzoCV = await db.query(queryPrezzoCV, idStruttura).catch(() => {throw createError(500)});

                let servizi = [];

                console.log("Prezzo BB", prezzoBB);
                // Caso B&B
                if (prezzoBB[0]) {
                    servizi = await db.query(queryServiziBB, idStruttura).catch(() => {throw createError(500)});

                    // Aggiunta a struttura
                    struttura.prezzo = prezzoBB // array di oggetti {tipologiaStanza, prezzo}
                }

                // Caso CV
                else if (prezzoCV[0]) {
                    servizi = await db.query(queryServiziCV, idStruttura).catch(() => {throw createError(500)});
                    let ambienti = await db.query(queryAmbientiCV, idStruttura).catch(() => {throw createError(500)});
                    let bagniCamereLetti = await db.query(queryBagniCamereLetti, idStruttura).catch(() => {throw createError(500)});

                    // Aggiunta a struttura
                    struttura.prezzo = prezzoCV[0]; // number

                    struttura.ambienti = Object.keys(ambienti[0])
                        .reduce(function(risultato, ambiente) {
                            if (ambienti[0][ambiente] === 1) {
                                risultato.push(ambiente);
                            }

                            return risultato;
                        }, []);

                    struttura.bagni = bagniCamereLetti[0].bagni;
                    struttura.camere = bagniCamereLetti[0].camere;
                    struttura.lettiSingoli = bagniCamereLetti[0].singoli;
                    struttura.lettiMatrimoniali = bagniCamereLetti[0].matrimoniali;
                }

                // Struttura non trovata o informazioni obbligatorie mancanti
                else throw createError(404);

                // Aggiunta di informazioni dello stesso tipo
                struttura.servizi = Object.keys(servizi[0])
                    .reduce(function(risultato, servizio) {
                        if (servizi[0][servizio] === 1) {
                            risultato.push(servizio);
                        }

                        return risultato;
                    }, []);

                struttura.foto = fotografie.map((oggetto) => {return oggetto.percorso});
                struttura.localita = localita[0];

                console.log(struttura);
                return callback(struttura);
            })
        } catch(err) {
            throw err;
        }
    },

    cerca: async function(datiRicerca, callback) {

        const db = await makeDb(config);

        // Strutture che si trovano nella zona cercata
        let queryDestinazione = `SELECT struttura.idStruttura
        FROM struttura, indirizzo
        WHERE
        struttura.refIndirizzo = indirizzo.idIndirizzo AND
        indirizzo.refComune IN (
            SELECT comuni.idComune
            FROM comuni, province, regioni
            WHERE
            comuni.refProvincia = province.idProvincia AND
            province.refRegione = regioni.idRegione AND (
                comuni.nomeComune = "${datiRicerca.destinazione}" OR
                province.nomeProvincia = "${datiRicerca.destinazione}" OR
                regioni.nomeRegione = "${datiRicerca.destinazione}"
            )
        )`;

        // CV: CV che non abbiano prenotazioni nel periodo selezionato e con abbastanza letti
        let queryPrenotazioniCV = `SELECT CV.refStruttura
        FROM casaVacanze as CV
        WHERE
        (CV.nLettiSingoli + 2 * CV.nLettiMatrimoniali) >= ${datiRicerca.ospiti} AND
        CV.refStruttura NOT IN (
            SELECT prenotazione.refStruttura
            FROM prenotazione
            WHERE
            ("${datiRicerca.arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR
            ("${datiRicerca.partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR
            ("${datiRicerca.arrivo}" <= prenotazione.checkIn AND "${datiRicerca.partenza}" >= prenotazione.checkOut)
        )`

        // B&B: B&B con almeno una camera disponibile che abbia abbastanza letti
        let queryPrenotazioniBB = `SELECT DISTINCT CBB1.refStruttura
        FROM \`cameraB&B\` as CBB1
        WHERE
        (CBB1.nLettiSingoli + 2 * CBB1.nLettiMatrimoniali) >= ${datiRicerca.ospiti} AND
        (CBB1.refStruttura, CBB1.idCamera) NOT IN (
            SELECT DISTINCT CBB2.refStruttura, CBB2.idCamera
            FROM \`cameraB&B\` as CBB2, prenotazioneCamera, prenotazione
            WHERE
            CBB2.idCamera = prenotazioneCamera.refCamera AND
            CBB2.refStruttura = prenotazioneCamera.refStruttura AND
            prenotazioneCamera.refPrenotazione = prenotazione.idPrenotazione AND
            prenotazioneCamera.refStruttura = prenotazione.refStruttura AND (
                ("${datiRicerca.arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR
                ("${datiRicerca.partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR
                ("${datiRicerca.arrivo}" < prenotazione.checkIn AND "${datiRicerca.partenza}" > prenotazione.checkOut)
            )
        )`

        let query;
        // Solo case vacanze
        if (datiRicerca.bedAndBreakfast !== "true") {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura
            FROM struttura
            WHERE
            struttura.idStruttura IN (${queryDestinazione}) AND
            struttura.idStruttura IN (${queryPrenotazioniCV})`
        }

        // Solo bed and breakfast
        else if (datiRicerca.casaVacanze !== "true") {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura
            FROM struttura
            WHERE
            struttura.idStruttura IN (${queryDestinazione}) AND
            struttura.idStruttura IN (${queryPrenotazioniBB})`
        }

        // Sia case vacanze che B&B
        else {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura
            FROM struttura
            WHERE
                struttura.idStruttura IN (${queryDestinazione}) AND (
                    (struttura.idStruttura IN (${queryPrenotazioniBB})) OR
                    (struttura.idStruttura IN (${queryPrenotazioniCV}))
            )`
        }

        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(query, []).catch((err) => {throw createError(500)});
                return callback(risultato);
            })
        } catch (err) {
            throw err;
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
                return callback(results);
            });
        } catch (err) {
            console.log(err);
        }
    },

    listaStrutture:async function(callback){
        const db = await makeDb(config);
        let idGestore=1; /!*TODO:sistemare gestore*!/
        try {
            await withTransaction(db, async () => {
                let results=await db.query(('SELECT * FROM struttura JOIN indirizzo WHERE struttura.refGestore = ? AND struttura.refIndirizzo=indirizzo.idIndirizzo '),[idGestore]).catch(err => {
                    throw err;
                });
                return callback(results);
            });
        }
        catch (err) {
            console.log(err);
        }
    },

    calcoloGuadagno: async function(dati, callback){
        const db = await makeDb(config);
        let idGestore=dati.refGestore;
        let dataInizio=dati.dataInizio;
        let dataFine= dati.dataFine;
        let idStruttura = dati.idStruttura;
        try {
            risultato = await db.query(('SELECT * FROM prenotazione JOIN condizioni WHERE `prenotazione`.refStruttura=? AND `prenotazione`.refStruttura = `condizioni`.refStruttura \
            AND prenotazione.confermata=1 AND (prenotazione.checkIn >= ? AND prenotazione.checkIn<=?) AND (prenotazione.checkOut >= ? AND prenotazione.checkOut<=?)'),
                [idStruttura, dataInizio, dataFine, dataInizio, dataFine]).catch(err=>{throw err});
            return callback(risultato);
        }
        catch (err) {
            console.log(err);
        }
    }
};
