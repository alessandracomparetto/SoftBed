var db = require('../db/dbmiddleware');

module.exports = {

    create: async function (datiPrenotazione, callback) {

        let query = ('INSERT INTO `prenotazione` (checkIn, checkOut, costo, nAdulti, nBambini, nEsenti, refMetodoPagamento, refUtente, refStruttura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

        let datiQuery = [
            datiPrenotazione.dataCheckIn + " " + datiPrenotazione.orarioCheckIn,
            datiPrenotazione.dataCheckOut + " " + datiPrenotazione.orarioCheckOut,
            datiPrenotazione.prezzo,
            datiPrenotazione.adulti,
            datiPrenotazione.bambini,
            datiPrenotazione.esenti,
            datiPrenotazione.metodoPagamento,
            datiPrenotazione.idUtente,
            datiPrenotazione.idStruttura
        ];

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
