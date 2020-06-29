var db = require('../db/dbmiddleware');

module.exports={

    create:async function(datiOspite, callback) {
        let refIndirizzo, refOspite;
        let sql = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES (?,?,?,?)');
        let datiQuery = [datiOspite.via, datiOspite.numero, datiOspite.cap, datiOspite.refComuneResidenza];
        db.query(sql, datiQuery, function (err, risultato1){  //INSERIMENTO IN INDIRIZZO
            if (err) throw err;

            refIndirizzo = risultato1.insertId;

            sql = ('INSERT INTO `ospite` (nome, cognome, codiceFiscale, dataNascita, refindirizzo, refComuneNascita, refPrenotazione, tassa, dataArrivo, permanenza) VALUES (?,?,?,?,?,?,?,?,?,?)');
            //TODO: REF PRENOTAZIONE
            datiQuery = [datiOspite.nome, datiOspite.cognome, datiOspite.codiceFiscale, datiOspite.dataNascita, refIndirizzo, datiOspite.refComuneNascita, 1, datiOspite.tassa, datiOspite.dataArrivo, datiOspite.permanenza];
            db.query(sql, datiQuery, function (err, risultato2) { //INSERIMENTO IN OSPITE
                if (err) throw err;
                refOspite = risultato2.insertId;

                sql = ('INSERT INTO `documenti` (refOspite, percorso) VALUES (?,?)');
                if(datiOspite.foto) {
                    for(foto of datiOspite.foto){
                        datiQuery = [refOspite, foto];
                        db.query(sql, datiQuery, function (err) { //INSERIMENTO IN DOCUMENTI
                            if(err) throw err;
                            console.log("inseriti documenti");
                        }); //chiusura query foto
                    }}//end if

            });//chiusura query ospite

            return callback(refOspite);
        }); //chiusura query indirizzo
    },//end create

    delete: async function (idPrenotazione, callback) {

        let query = (`DELETE FROM prenotazione WHERE idPrenotazione = ? `);

        db.query(query, idPrenotazione, function (err, risultato) {
            if (err) callback(err);
            else callback(risultato);
        })
    } //end delete
};
