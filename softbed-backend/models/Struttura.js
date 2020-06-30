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
                infoStruttura[0]["foto"] = array;
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

        /*results = await db.query('UPDATE ?? SET\
                            ?? = ? WHERE id_utente = ?', [record[2], record[3], record[4], id_utente])
            .catch(err => { console.log(err); });
*/
    },

    carica: async function(idStruttura, callback) {

        const db = await makeDb(config);
        let struttura = {};

        let query = `SELECT struttura.nomeStruttura, struttura.descrizione, struttura.tipologiaStruttura \ 
            FROM struttura \
            WHERE struttura.idStruttura = ?`

        let queryFoto = `SELECT fotografie.percorso \
            FROM fotografie \ 
            WHERE fotografie.refStruttura = ?`

        try {
            await withTransaction(db, async () => {

                let risultato = await db.query(query, [idStruttura]).catch((err) => console.log(err));

                struttura = risultato[0];

                let fotografie = await db.query(queryFoto, idStruttura).catch((err) => console.log(err));

                struttura.foto = fotografie.map((oggetto) => {return oggetto.percorso});
                return callback(struttura);
            })
        } catch(err) {
            console.log(err);
        }
    },

    cerca: async function(datiRicerca, callback) {

        const db = await makeDb(config);

        // Strutture che si trovano nella zona cercata
        // (?, ?, ?) -> (destinazione, destinazione, destinazione)
        let queryDestinazione = `SELECT comuni.idComune \
        FROM comuni, province, regioni \
        WHERE \
        comuni.refProvincia = province.idProvincia AND \
        province.refRegione = regioni.idRegione AND (\
        comuni.nomeComune = ? OR \
        province.nomeProvincia = ? OR \
        regioni.nomeRegione = ?)`

        // Strutture disponibili nel periodo cercato
        // (?, ?, ?, ?) -> (dataArrivo, dataPartenza, dataArrivo, dataPartenza)
        let queryData = `SELECT struttura.idStruttura \ 
        FROM struttura \ 
        WHERE struttura.idStruttura NOT IN (
            SELECT DISTINCT indisponibilita.refStruttura \ 
            FROM indisponibilita \ 
            WHERE \ 
            (? BETWEEN indisponibilita.dataInizio AND indisponibilita.dataFine) OR \ 
            (? BETWEEN indisponibilita.dataInizio AND indisponibilita.dataFine) OR \
            (? < indisponibilita.dataInizio AND ? > indisponibilita.dataFine)
        )`

        // Strutture disponibili nel periodo e nella zona cercata
        let queryDestinazioneData = `SELECT struttura.idStruttura \
        FROM struttura, indirizzo \
        WHERE \
        struttura.refIndirizzo = indirizzo.idIndirizzo AND \
        indirizzo.refComune IN (${queryDestinazione}) AND \
        struttura.idStruttura IN (${queryData})`;

        // CV: Controllo che la CV non abbia prenotazioni nel periodo selezionato e che abbia abbastanza letti
        let queryPrenotazioniCV = `SELECT CV.refStruttura \ 
        FROM casaVacanze as CV \ 
        WHERE \
        (CV.nLettiSingoli + 2 * CV.nLettiMatrimoniali) >= ${datiRicerca.ospiti} AND \
        CV.refStruttura NOT IN ( \ 
            SELECT prenotazione.refStruttura \ 
            FROM prenotazione \ 
            WHERE \ 
            ("${datiRicerca.arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR \ 
            ("${datiRicerca.partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR \ 
            ("${datiRicerca.arrivo}" < prenotazione.checkIn AND "${datiRicerca.partenza}" > prenotazione.checkOut)`

        // B&B: Strutture con almeno una camera disponibile che abbia abbastanza letti
        let queryPrenotazioneBB = `SELECT DISTINCT CBB1.refStruttura \ 
        FROM \`cameraB&B\` as CBB1
        WHERE \ 
        (CBB1.nLettiSingoli + 2 * CBB1.nLettiMatrimoniali) >= ${datiRicerca.ospiti} AND \
        (CBB1.refStruttura, CBB1.idCamera) NOT IN ( \
            SELECT DISTINCT CBB2.refStruttura, CBB2.idCamera \ 
            FROM \`cameraB&B\` as CBB2, prenotazioneCamera, prenotazione \ 
            WHERE \ 
            CBB2.idCamera = prenotazioneCamera.refCamera AND \ 
            CBB2.refStruttura = prenotazioneCamera.refStruttura AND \ 
            prenotazioneCamera.refPrenotazione = prenotazione.idPrenotazione AND \ 
            prenotazioneCamera.refStruttura = prenotazione.refStruttura AND ( \
                ("${datiRicerca.arrivo}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR \
                ("${datiRicerca.partenza}" BETWEEN prenotazione.checkIn AND prenotazione.checkOut) OR \
                ("${datiRicerca.arrivo}" < prenotazione.checkIn AND "${datiRicerca.partenza}" > prenotazione.checkOut) \
            )
        )`

        // Query per B&B
        let queryBB = `SELECT BB.refStruttura \ 
        FROM \`B&B\` as BB \ 
        WHERE BB.refStruttura IN (${queryPrenotazioneBB})`

        // Query per CasaVacanze
        let queryCV = `SELECT CV.refStruttura \ 
        FROM casaVacanze as CV \ 
        WHERE CV.refStruttura IN (${queryPrenotazioniCV})`

        let query;
        // Solo case vacanze
        if (datiRicerca.bedAndBreakfast !== "true") {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura, struttura.descrizione \
            FROM struttura \
            WHERE \ 
            struttura.idStruttura IN (${queryDestinazioneData}) AND \ 
            struttura.idStruttura IN (${queryCV})`
        }

        // Solo bed and breakfast
        else if (datiRicerca.casaVacanze !== "true") {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura, struttura.descrizione \
            FROM struttura \
            WHERE \ 
            struttura.idStruttura IN (${queryDestinazioneData}) AND \ 
            struttura.idStruttura IN (${queryBB})`
        }

        // Sia case vacanze che B&B
        else {
            query = `SELECT struttura.idStruttura, struttura.nomeStruttura, struttura.descrizione \
            FROM struttura \
            WHERE struttura.idStruttura IN (${queryDestinazioneData})`;
        }

        let parametri = [datiRicerca.destinazione, datiRicerca.destinazione, datiRicerca.destinazione, datiRicerca.arrivo, datiRicerca.partenza, datiRicerca.arrivo, datiRicerca.partenza];

        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(query, parametri).catch((err) => console.log(err));
                return callback(risultato);
            })

        } catch (err) { console.log(err) }
    }

}

/*, maxSoggiorno=?, oraInizioCheckIn=?, oraInizioCheckOut=?, oraFineCheckIn=?, oraFineCheckOut=?,
                 pagamentoLoco=?, pagamentoOnline=?, prezzoBambini=?, prezzoAdulti=?, percentualeRiduzione=?, nPersoneRiduzione=?, esclusioneSoggiorni=?, anticipoPrenotazioneMin=?,
                 anticipoPrenotazioneMax=?, politicaCancellazione=?, penaleCancellazione=?, preavvisoDisdetta=? */
/*
, struttura.oraInizioCheckIn, struttura.oraFineCheckOut, struttura.pagamentoLoco, struttura.pagamentoOnLine, struttura.prezzoBambini, struttura.prezzoAdulti, struttura.percentualeRiduzione, struttura.nPersoneRiduzione,
                    struttura.esclusioneSoggiorni, struttura.anticipoPrenotazioneMin, struttura.anticipoPrenotazioneMax, struttura.politicaCancellazione, struttura.penaleCancellazione, struttura.preavvisoDisdetta*/

    /*

        db.query(sql, datiQuery, function (err, risultato1) {  //INSERIMENTO IN INDIRIZZO
            if (err) throw err;

            //se tutto va bene, trovo id indirizzo e inserisco nella struttura
            refIndirizzo = risultato1.insertId;
            let giorno = new Date().toLocaleDateString();
            sql = ('INSERT INTO `struttura` (nomestruttura, tipologiastruttura, refgestore, refindirizzo, rendicontoeffettuato) VALUES (?,?,?,?,?)');
            //TODO: REF GESTORE
            datiQuery = [datiStruttura.nomeStruttura, datiStruttura.tipologiaStruttura, 3, refIndirizzo, giorno];
            db.query(sql, datiQuery, function (err, risultato2) { //INSERIMENTO IN STRUTTURA
                if (err) throw err;
                console.log("inserita struttura");

                let refStruttura = risultato2.insertId;
                sql = ('INSERT INTO `fotografie` (refStruttura, percorso) VALUES (?,?)');
                if(datiStruttura.foto) {
                    for(foto of datiStruttura.foto){
                        datiQuery = [refStruttura, foto];
                        db.query(sql, datiQuery, function (err) { //INSERIMENTO IN FOTOGRAFIE
                            if(err) throw err;
                            console.log("inserite foto");
                        }); //chiusura query foto
                    }}//end for

                sql = ('INSERT INTO `condizioni` (refIdStruttura, minSoggiorno, maxSoggiorno, oraInizioCheckIn, oraInizioCheckOut, oraFineCheckIn, \
                            oraFineCheckOut,pagamentoLoco,pagamentoOnline, prezzoBambini, prezzoAdulti, percentualeRiduzione, nPersoneRiduzione, esclusioneSoggiorni, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            politicaCancellazione, penaleCancellazione, preavvisoDisdetta) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti, datiStruttura.percentualeRiduzione, datiStruttura.nPersoneRiduzione,
                    datiStruttura.esclusioneSoggiorni, datiStruttura.anticipoPrenotazioneMin, datiStruttura.anticipoPrenotazioneMax, datiStruttura.politicaCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                db.query(sql, datiQuery, function (err) { //INSERIMENTO IN CONDIZIONI
                    if (err) throw err;

                    console.log("inserite condizioni");
                    if(datiStruttura.tipologiaStruttura === "B&B") { //query per B&B
                        sql = ('INSERT INTO `b&b` (refstruttura, bambini, ariacondizionata, wifi, riscaldamento, parcheggio, strutturadisabili, animaliammessi, permessofumare, tv, \
                            cucinaceliaci, navettaaereportuale, servizioincamera, descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.riscaldamento, datiStruttura.parcheggio,
                            datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.tv, datiStruttura.cucinaCeliaci,
                            datiStruttura.navettaAeroportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                        db.query(sql, datiQuery, function (err) {
                            if (err) throw err;

                            console.log("inserito b&b");
                            for(camera of datiStruttura.camere) {
                                sql = 'INSERT INTO `camerab&b` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES (?,?,?,?,?)';
                                datiQuery = [refStruttura, camera.tipologiaCamera, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoBaseANotte];
                                db.query(sql, datiQuery, function (err) {
                                    if (err) throw err;
                                    console.log("inserite camere");
                                });//chiusura query camere
                            }
                        }); //chiusura query caratteristiche
                    }//chiusura if
                    else if(datiStruttura.tipologiaStruttura ==="cv") {
                        sql = ('INSERT INTO `casavacanze` (refstruttura, bambini, riscaldamento, ariacondizionata, wifi, parcheggio, strutturadisabili, animaliammessi, permessofumare, \
                            festeammesse, tv, salotto, giardino, terrazza, piscina, nbagni, ncamere, nlettisingoli, nlettimatrimoniali, prezzonotte, descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.riscaldamento, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                            datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.festeAmmesse, datiStruttura.tv, datiStruttura.salotto,
                            datiStruttura.giardino, datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nBagni, datiStruttura.nCamere, datiStruttura.nLettiSingoli, datiStruttura.nLettiMatrimoniali, datiStruttura.prezzoNotte, datiStruttura.descrizione];
                        db.query(sql, datiQuery, function (err, risultato3) {
                            if (err) throw err;
                            console.log("inserita cv");
                        }); //chiusura query cv
                    }//else if
                }); //chiusura query condizioni

            });//chiusura query struttura

            return callback("OK");
        }); //chiusura query inidirizzo
    }, //end create

    fetch: async function (callback) {

        *  TODO sistemare per casa vacanze*!/
        let camere;
        let foto;
        let array = [];
        let idStruttura = 4;
        //recupero le informazioni generali della struttura
        let infoStruttura = db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `comuni` JOIN `province` JOIN `regioni` JOIN `condizioni` JOIN `B&B`  WHERE `struttura`.idStruttura= ? AND `struttura`.refGestore=3 AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo \
            AND `struttura`.idStruttura=`condizioni`.refIdStruttura AND `B&B`.refStruttura=`struttura`.idStruttura AND `indirizzo`.refComune = `comuni`.idComune AND `comuni`.refProvincia=`province`.`idProvincia` AND `province`.refRegione=`regioni`.idRegione', idStruttura,function (err) {
                if (err) throw err;
                foto = db.query(('SELECT `percorso` FROM `fotografie` WHERE  `fotografie`.refStruttura = ?'), idStruttura , function (err) {
                    if(err) throw err;
                    for(let i = 0; i< foto._results[0].length; i++){
                        array.push(foto._results[0][i].percorso);
                    }
                    console.log(array);
                    infoStruttura._results[0][0]["foto"] = array;
                    if(infoStruttura._results.length==0){
                        infoStruttura = db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `condizioni` JOIN `casaVacanze`  WHERE `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refIdStruttura AND `casaVacanze`.refStruttura=`struttura`.idStruttura', 3, function (err) {
                            if (err) throw err;
                            //TODO RIVEDERE
                            return callback("ok");
                        })
                    }
                    else {
                        camere = db.query(('SELECT * FROM `camerab&b` WHERE `camerab&b`.refStruttura = ?'), idStruttura, function (err) {
                            if (err) throw err;
                            infoStruttura._results[0][0]["camere"] = camere._results[0];

                            return callback(infoStruttura._results[0][0]);
                        });
                    }
                });
            }
        )
    },

    */
