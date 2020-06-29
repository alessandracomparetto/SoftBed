var db = require('../db/dbmiddleware');

module.exports = {

    create: async function (datiPrenotazione, callback) {

        let query = ('INSERT INTO `prenotazione` (checkIn, checkOut, costo, nAdulti, nBambini, nEsenti, refMetodoPagamento, refUtente, refStruttura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

        let datiQuery = [
            datiPrenotazione.dataCheckIn + " " + datiPrenotazione.oraCheckIn,
            datiPrenotazione.dataCheckOut + " " + datiPrenotazione.oraCheckOut,
            datiPrenotazione.costo,
            datiPrenotazione.nAdulti,
            datiPrenotazione.nBambini,
            datiPrenotazione.nEsenti,
            datiPrenotazione.refMetodoPagamento,
            datiPrenotazione.refUtente,
            datiPrenotazione.refStruttura];

        db.query(query, datiQuery, function (err, risultato) {
            if (err) callback(err);
            else callback(risultato);
        });
    },

    delete: async function (idPrenotazione, callback) {

        let query = (`DELETE FROM prenotazione WHERE idPrenotazione = ? `);

        db.query(query, idPrenotazione, function (err, risultato) {
            if (err) callback(err);
            else callback(risultato);
        })
    }
}