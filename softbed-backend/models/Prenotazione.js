const {makeDb, withTransaction} = require('../db/dbmiddleware');
const {config} = require("../db/config");

module.exports = {

    create: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);

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

        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(query, datiQuery).catch(err => console.log(err));
                return callback(risultato);
            })
        } catch(err) {
            console.log(err)
        }
    },

    delete: async function (idPrenotazione, callback) {

        let query = (`DELETE FROM prenotazione WHERE idPrenotazione = ? `);

        db.query(query, idPrenotazione, function (err, risultato) {
            if (err) callback(err);
            else callback(risultato);
        })
    }
}
