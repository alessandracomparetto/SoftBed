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
    },

    getPrenotazioni: async function(dati, callback){
        console.log("IDStruttura"+dati.idStruttura);
        idStruttura=dati.idStruttura;
        /*TODO:aggiungere camere*/
        const db=await makeDb(config);
        let result={};
        try{
           await withTransaction(db,async()=> {
               results=await db.query('SELECT * FROM prenotazione JOIN utente JOIN autenticazione WHERE prenotazione.refStruttura=? AND prenotazione.refUtente=utente.idUtente AND utente.idUtente =autenticazione.refUtente', [[[idStruttura]]]).catch(err=>{
                   throw err;
               });
               console.log("RESULT");
               console.log(results);
               return callback(results);
           });
        }
        catch(err){
            console.log(err);
        }
    },

    rifiutaPrenotazione: async function(data,res){
        const db = await makeDb(config);

        console.log("sto per eliminare");
        console.log("id"+data.idPrenotazione);
        let query = (`DELETE FROM prenotazione WHERE idPrenotazione = ?`);

        try {
            await withTransaction(db, async () => {
                let result = await db.query(query, data.idPrenotazione).catch(() => {throw createError(500)});
                console.log(result);
                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
                else return res(result);
            })
        } catch(err) {
            throw err;
        }
    },

    confermaPrenotazione: async function(data,res){
        const db = await makeDb(config);
        let dataConferma=new Date();
        console.log("sto per confermare");
        console.log("id"+data.idPrenotazione);
        console.log(dataConferma);
        try {
            await withTransaction(db, async () => {
                let result = await db.query('UPDATE prenotazione SET prenotazione.confermata=1 , prenotazione.dataScadenza=null , prenotazione.dataConferma=? WHERE idPrenotazione = ?', [dataConferma,data.idPrenotazione]).catch((err) => {throw err});
                console.log(result);
            })
        } catch(err) {
            throw err;
        }
    },
}
