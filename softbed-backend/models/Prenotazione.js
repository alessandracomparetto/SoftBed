const {makeDb, withTransaction} = require('../db/dbmiddleware');
const {config} = require("../db/config");
const createError = require('http-errors');

module.exports = {

    create: async function (datiPrenotazione, res) {
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
                let risultato = await db.query(query, datiQuery).catch(() => {throw createError(500)});

                if (risultato && risultato.insertId) return res(risultato.insertId);
                else throw createError(400);
            })
        } catch(err) {
            throw err;
        }
    },

    delete: async function (idPrenotazione, res) {
        const db = await makeDb(config);

        let query = (`DELETE FROM prenotazione WHERE idPrenotazione = ?`);

        try {
            await withTransaction(db, async () => {
                let result = await db.query(query, req).catch(() => {throw createError(500)});

                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
                else return res(result);
            })
        } catch(err) {
            throw err;
        }
    }
}
