/*Model della struttura*/
// const { config } = require('../db/config');
// const { makeDb, withTransaction } = require('../db/dbmiddleware');
// const db = makeDb(config);
var db = require('../db/dbmiddleware');

module.exports={

    //FIXME: rimane pending???
    create:async function(datiStruttura, callback) {
        let refIndirizzo;
        console.log("qui ci sono");
        let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES (?,?,?,?)');
        let datiQuery = [datiStruttura.address, datiStruttura.addressnum, datiStruttura.cap, datiStruttura.town];
        db.query(sql, datiQuery, function (err, risultato1){  //INSERIMENTO IN INDIRIZZO
            if (err) throw err;

            //se tutto va bene, trovo id indirizzo e inserisco nella struttura
            refIndirizzo = risultato1.insertId;
            let giorno = new Date().toLocaleDateString();
            sql = ('INSERT INTO `struttura` (nomestruttura, tipologiastruttura, refgestore, refindirizzo, rendicontoeffettuato) VALUES (?,?,?,?,?)');
            //TODO: REF GESTORE
            datiQuery = [datiStruttura.name, datiStruttura.tipologia, 3, refIndirizzo, giorno];
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
                    datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.pagamentoLoco, datiStruttura.pagamentoOnline, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti, datiStruttura.percentualeCondizioni, datiStruttura.nPersone,
                    datiStruttura.nGiorniEsclusione, datiStruttura.minPrenotazione, datiStruttura.maxPrenotazione, datiStruttura.politiCancellazione, datiStruttura.prezzoCancellazione, datiStruttura.preavvisoDisdetta];
                db.query(sql, datiQuery, function (err) { //INSERIMENTO IN CONDIZIONI
                    if (err) throw err;

                    console.log("inserite condizioni");
                    if(datiStruttura.tipologia === "B&B") { //query per B&B
                        sql = ('INSERT INTO `b&b` (refstruttura, bambini, ariacondizionata, wifi, parcheggio, strutturadisabili, \
                       animaliammessi, permessofumare, tv, cucinaceliaci, navettaaereportuale, servizioincamera, descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.aria, datiStruttura.connessione, datiStruttura.parcheggio,
                            datiStruttura.disabili, datiStruttura.animali, datiStruttura.permessoFumo, datiStruttura.tv, datiStruttura.cucina,
                            datiStruttura.navettaAereoportuale, datiStruttura.servizioInCamera, datiStruttura.descrizione];
                        db.query(sql, datiQuery, function (err) {
                            if (err) throw err;

                            console.log("inserite caratteristiche");
                            for(camera of datiStruttura.camere) {
                                sql = 'INSERT INTO `camerab&b` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES (?,?,?,?,?)';
                                datiQuery = [refStruttura, camera.tipologia, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoCamere];
                                db.query(sql, datiQuery, function (err) {
                                    if (err) throw err;
                                    console.log("inserite camere");
                                });//chiusura query camere
                            }
                        }); //chiusura query caratteristiche
                    }//chiusura if
                    else if(datiStruttura.tipologia==="cv") {
                        sql = ('INSERT INTO `casavacanze` (refstruttura, bambini, ariacondizionata, wifi, parcheggio, strutturadisabili, \
                       animaliammessi, permessofumare,festeammesse, tv,salotto,giardino,terrazza,piscina,nBagni,nCamere,nlettiSingoli,nlettiMatrimoniali,prezzonotte,descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.bambini, datiStruttura.aria, datiStruttura.connessione, datiStruttura.parcheggio,
                            datiStruttura.disabili, datiStruttura.animali, datiStruttura.permessoFumo, datiStruttura.feste, datiStruttura.tv, datiStruttura.salotto,
                            datiStruttura.giardino, datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nBagni, datiStruttura.nCamere, datiStruttura.nLettiSingoli, datiStruttura.nLettiMatrimoniali, datiStruttura.prezzo, datiStruttura.descrizione];
                        db.query(sql, datiQuery, function (err, risultato3) {
                            if (err) throw err;
                            console.log("inserita cv");
                        }); //chiusura query cv
                    }//else if
                }); //chiusura query condizioni

            });//chiusura query struttura

            return callback("OK");
        }); //chiusura query inidirizzo
    } //end create
};






/*
        ,
    fetchCrud:function(callback){
        var sql='SELECT * FROM crud';
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            return callback(data);
        });
    },
    editCrud:function(editId, callback){

        var sql=`SELECT * FROM crud WHERE id=${editId}`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },
    UpdateCrud:function(updateData,updateId,callback){

        var sql = `UPDATE crud SET ? WHERE id= ?`;
        db.query(sql, [updateData, updateId], function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
    deleteCrud:function(deleteId,callback){
        var sql = 'DELETE FROM crud WHERE id = ?';
        db.query(sql, [deleteId], function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    }};*/
