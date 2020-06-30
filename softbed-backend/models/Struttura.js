/*Model della struttura*/
// const { config } = require('../db/config');
// const { makeDb, withTransaction } = require('../db/dbmiddleware');
// const db = makeDb(config);
var db = require('../db/dbmiddleware');

module.exports= {

    create: async function (datiStruttura, callback) {
        let refIndirizzo;
        console.log("qui ci sono");
        let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES (?,?,?,?)');
        let datiQuery = [datiStruttura.via, datiStruttura.numeroCivico, datiStruttura.cap, datiStruttura.nomeComune];
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
                                sql = 'INSERT INTO `cameraB&B` (refStruttura, tipologiaCamera, nlettiSingoli, \
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

    search: async function(datiRicerca, callback) {

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

        // Strutture NON disponibili nel periodo cercato
        // (?, ?) -> (dataArrivo, dataPartenza)
        let queryData = `SELECT refStruttura \
        FROM indisponibilita \
        WHERE \
        (? BETWEEN dataInizio AND dataFine) OR \
        (? BETWEEN dataInizio AND dataFine)`;

        // Strutture disponibili nel periodo e nella zona cercata
        let queryID = `SELECT struttura.idStruttura \
        FROM struttura, indirizzo \
        WHERE \
        struttura.refIndirizzo = indirizzo.idIndirizzo AND \
        indirizzo.refComune IN (${queryDestinazione}) AND \
        struttura.idStruttura NOT IN (${queryData})`;

        // Query per B&B
        let queryBB = `SELECT struttura.idStruttura \
        FROM struttura, "B&B" \
        WHERE struttura.idStruttura = "B&B".refStruttura`

        // Query per CasaVacanze
        let queryCV = `SELECT struttura.idStruttura \
        FROM struttura, casaVacanze \
        WHERE struttura.idStruttura = casaVacanze.refStruttura`

        // TODO: Controllo sul numero di ospiti...

        let queryTMP = `SELECT struttura.idStruttura, struttura.nomeStruttura, struttura.descrizione \
        FROM struttura \
        WHERE struttura.idStruttura IN (${queryID})`;

        let parametri = [datiRicerca.destinazione, datiRicerca.destinazione, datiRicerca.destinazione, datiRicerca.arrivo, datiRicerca.partenza];

        db.query(queryTMP, parametri, function(err, risultato) {
            if (err) return callback(err);
            else return callback(risultato);
        })
    },

    fetch: async function (callback) {
        /*TODO CAMBIARE refGestore
        *  TODO sistemare per casa vacanze*/
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

    modificaCondizioni : async function ( struttura, callback){

        let query = ('UPDATE `condizioni` SET minSoggiorno=?, maxSoggiorno=?, oraInizioCheckIn=?, oraInizioCheckOut=?, oraFineCheckIn=?, oraFineCheckOut=?, \
             pagamentoLoco=?, pagamentoOnline=?, prezzoBambini=?, prezzoAdulti=?, percentualeRiduzione=?, nPersoneRiduzione=?, esclusioneSoggiorni=?, anticipoPrenotazioneMin=?, \
             anticipoPrenotazioneMax=?, politicaCancellazione=?, penaleCancellazione=?, preavvisoDisdetta=? WHERE (idCondizioni=4)');
        console.log(query);
        let datiQuery = [struttura.minSoggiorno, struttura.maxSoggiorno, struttura.oraInizioCheckIn,struttura.oraFineCheckOut, struttura.pagamentoLoco, struttura.pagamentoOnLine, parseInt(struttura.prezzoBambini), parseInt(struttura.prezzoAdulti), struttura.percentualeRiduzione, struttura.nPersoneRiduzione,
            struttura.esclusioneSoggiorni, struttura.anticipoPrenotazioneMin, struttura.anticipoPrenotazioneMax, struttura.politicaCancellazione, struttura.penaleCancellazione, struttura.preavvisoDisdetta];
        console.log("sto per modificare!");
        db.query=(query, datiQuery, function (err, data) {
            if(err) throw err;
            console.log("ho modificato!");
            return callback(data);
        });
    },

    carica: async function(idStruttura, callback) {

        let struttura = {};

        let query = `SELECT struttura.nomeStruttura, struttura.descrizione, struttura.tipologiaStruttura \
        FROM struttura \
        WHERE struttura.idStruttura = ?`

        let queryFoto = `SELECT fotografie.percorso \
        FROM fotografie \ 
        WHERE fotografie.refStruttura = ?`

        db.query(query, idStruttura, function(err, risultato) {
            if (err) return callback(err);
            else {
                struttura = risultato[0];
                db.query(queryFoto, idStruttura, function(err, risultato) {
                    if (err) return callback(err);
                    else {
                        struttura.foto = risultato.map((oggetto) => {return oggetto.percorso});
                        return callback(struttura);
                    }
                })
            }
        })

    }
};

