/*Model della struttura*/
// const { config } = require('../db/config');
// const { makeDb, withTransaction } = require('../db/dbmiddleware');
// const db = makeDb(config);
var db = require('../db/dbmiddleware');

module.exports= {

    //FIXME: rimane pending???
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

                //TODO CONTROLLARE PENALE DI CANCELLAZIONE E PREAVVISO DISDETTA, NON SONO RIUSCITA AD INSERIRLE
                sql = ('INSERT INTO `condizioni` (refIdStruttura, minSoggiorno, maxSoggiorno, oraInizioCheckIn, oraInizioCheckOut, oraFineCheckIn, \
                            oraFineCheckOut,pagamentoLoco,pagamentoOnline, prezzoBambini, prezzoAdulti, percentualeRiduzione, nPersoneRiduzione, esclusioneSoggiorni, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            politicaCancellazione, penaleCancellazione, preavvisoDisdetta) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti, datiStruttura.percentualeRiduzione, datiStruttura.nPersoneRiduzione,
                    datiStruttura.esclusioneSoggiorni, datiStruttura.anticipoPrenotazioneMin, datiStruttura.anticipoPrenotazioneMax, datiStruttura.politicaCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                db.query(sql, datiQuery, function (err) { //INSERIMENTO IN CONDIZIONI
                    if (err) throw err;

                    console.log("inserite condizioni");
                    if(datiStruttura.tipologia === "B&B") { //query per B&B
                        //TODO CONTROLLA RISCALDAMENTO
                        sql = ('INSERT INTO `b&b` (refstruttura, bambini, ariacondizionata, wifi, parcheggio, strutturadisabili, \
                       animaliammessi, permessofumare, tv, cucinaceliaci, navettaaereportuale, servizioincamera, descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                            datiStruttura.strutturaDisabili, datiStruttura.animaliAmmessi, datiStruttura.permessoFumare, datiStruttura.tv, datiStruttura.cucinaCeliaci,
                            datiStruttura.navettaAeroportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                        db.query(sql, datiQuery, function (err) {
                            if (err) throw err;

                            console.log("inserite caratteristiche");
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
                    else if(datiStruttura.tipologia==="cv") {
                        //TODO MANCA RISCALDAMENTO
                        sql = ('INSERT INTO `casavacanze` (refstruttura, bambini, ariacondizionata, wifi, parcheggio, strutturadisabili, \
                       animaliammessi, permessofumare,festeammesse, tv,salotto,giardino,terrazza,piscina,nBagni,nCamere,nlettiSingoli,nlettiMatrimoniali,prezzonotte,descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.ariaCondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
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

        console.log('search');
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

        let parametri = [datiRicerca.destinazione, datiRicerca.destinazione, datiRicerca.destinazione, datiRicerca.dataArrivo, datiRicerca.dataPartenza]

        db.query(queryTMP, parametri, function(err, risultato) {
            if (err) return callback(err);
            else return callback(risultato);
        })
    },

    fetch: async function (callback) {
        /*TODO CAMBIARE refGestore */
        //recupero le informazioni generali della struttura
        let infoStruttura = db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `condizioni` JOIN `B&B`  WHERE `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refIdStruttura AND `B&B`.refStruttura=`struttura`.idStruttura', 3, function (err) {
                if (err) throw err;
                if(infoStruttura.length==0){
                        infoStruttura = db.query('SELECT * FROM `struttura` JOIN `indirizzo` JOIN `condizioni` JOIN `casaVacanze`  WHERE `struttura`.refGestore=? AND `struttura`.refIndirizzo=`indirizzo`.idIndirizzo AND `struttura`.idStruttura=`condizioni`.refIdStruttura AND `casaVacanze`.refStruttura=`struttura`.idStruttura', 3, function (err) {
                        if (err) throw err;
                    })
                }
                return callback(infoStruttura._results);
            }
        )
    }
};

