/*Model della struttura*/
// const { config } = require('../db/config');
// const { makeDb, withTransaction } = require('../db/dbmiddleware');
// const db = makeDb(config);
var db = require('../db/dbmiddleware');

module.exports={

    //FIXME: rimane pending???
    create:async function(datiStruttura, callback){
        let refIndirizzo;
        console.log("qui ci sono");
        let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES (?,?,?,?)');
        let datiQuery = [datiStruttura.address, parseInt(datiStruttura.addressnum), datiStruttura.cap, datiStruttura.town]
        db.query(sql, datiQuery, function (err, risultato1){
            if (err) throw err;
            //se tutto va bene, trovo id indirizzo e inserisco nella struttura
            refIndirizzo = risultato1.insertId;
            let giorno = new Date().toLocaleDateString();
            sql = ('INSERT INTO `struttura` (nomestruttura, tipologiastruttura, refgestore, refindirizzo, rendicontoeffettuato) VALUES (?,?,?,?,?)');
            //TODO: REF GESTORE
            datiQuery =[datiStruttura.name, datiStruttura.tipologia, 3, refIndirizzo, giorno];
            db.query(sql, datiQuery, function (err, risultato2){
                if (err) throw err;
                let refStruttura = risultato2.insertId;
                return risultato2

                //qwery delle foto
                //TODO non esiste ancora questa tabella
                sql = ('INSERT INTO `fotografie` (refStruttura, percorso) VALUES (?,?)');
                for(foto of datiStruttura.foto){
                    let {stringa, percorso} = foto;
                    datiQuery = [refStruttura, percorso];
                    db.query(sql, datiQuery, function (err) {
                        if(err) throw err;
                    })
                }

                //qui magari query condizioni



                if(datiStruttura.tipologia === "B&B"){ //query per B&B
                    sql = ('INSERT INTO `b&b` (refstruttura, bambini, ariacondizionata, wifi, parcheggio, strutturadisabili, \
                        animaliammessi, permessofumare, tv, cucinaceliaci, navettaaereportuale, servizioincamera, descrizione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');
                    datiQuery=[refStruttura, datiStruttura.bambini, datiStruttura.aria, datiStruttura.connessione, datiStruttura.parcheggio,
                    datiStruttura.disabili, datiStruttura.animali, datiStruttura.permessoFumo, datiStruttura.tv,  datiStruttura.cucina,
                    datiStruttura.navettaAereoportuale,  datiStruttura.servizioInCamera, datiStruttura.descrizione];
                    db.query(sql, datiQuery, function (err, risultato3) {
                        if(err) throw err;
                        for( camera of datiStruttura.camere){
                            /*FIXME => la camera è camere: [
                            *                       camera0 : {dati:valori}
                            *                       camera1 : {dati:valori}
                            *   quindi bisogna fare in modo di essere sicuri di selezionare i valori e non il singolo oggetto
                            *   let {tipologia, nLettiSingoli, nLettiMatrimoniali, prezzoCamere} = camera;
                            *   potrebbe risolvere?
                            * */

                            sql = 'INSERT INTO `camerab&b` (refStruttura, tipologiaCamera, nlettiSingoli, \
                                nlettiMatrimoniali, prezzoBaseANotte) VALUES (?,?,?,?,?)';
                            datiQuery = [refStruttura, camera.tipologia, camera.nLettiSingoli, camera.nLettiMatrimoniali, camera.prezzoCamere]
                            db.query(sql, datiQuery, function( err, risultato){
                                if (err) throw err;
                            });
                        }
                        sql = ('INSERT INTO `condizioni` (refIdStruttra, minSoggiorno, maxSoggiorno, oraInizioCheckIn, oraInizioCheckOut, oraFineCheckIn, \
                            oraFineCheckOut, prezzoBambini, prezzoAdulti, percentualeRiduzione, nPersoneRiduzione, esclusioneSoggiorni, anticipoPrenotazioneMin, anticipoPrenotazioneMax, \
                            cancellazioneGratuita, penaleCancellazione) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
                        datiQuery = [refStruttura, datiStruttura.minSoggiorno, datiStruttura.maxSoggiorno, datiStruttura.oraInizioCheckIn, datiStruttura.oraInizioCheckOut,
                            datiStruttura.oraFineCheckIn, datiStruttura.oraFineCheckOut, datiStruttura.prezzoBambini, datiStruttura.prezzoAdulti, datiStruttura.percentualeCondizioni, datiStruttura.nPersone,
                            datiStruttura.nGiorniEsclusione, datiStruttura.minPrenotazione, datiStruttura.maxPrenotazione, "???????", datiStruttura.prezzoCancellazione];
                        /*TODO: ricontrollare quello che ho scritto, non combaciano alcune cose
                        *  per esempio il fatto che pagamento può essere sia in loco che online e qui non c'è traccia di questa cosa
                        *  allo stesso modo non c'è traccia del preavviso disdetta, che invece è presente nel form condizioni
                        *
                        *FIXME:  parseInt in tutti i campi numerici
                        * FIXME: la query delle condizioni è uguale per entrambe le strutture, quindi meglio farla prima dell'if per non riscriverla
                        */
                    });




                }

            });
        });//end query


    }







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
    }*/
};
