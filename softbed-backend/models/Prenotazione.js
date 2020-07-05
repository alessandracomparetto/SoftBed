const {makeDb, withTransaction} = require('../db/dbmiddleware');
const {config} = require("../db/config");
const createError = require('http-errors');

module.exports = {

    create: async function (datiPrenotazione, res) {
        const db = await makeDb(config);

        let query = ('INSERT INTO `prenotazione` (checkIn, checkOut, costo, nAdulti, nBambini, nEsentiAdulti, nEsentiBambini, refMetodoPagamento, refUtente, refStruttura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

        let datiQuery = [
            datiPrenotazione.dataCheckIn + " " + datiPrenotazione.orarioCheckIn,
            datiPrenotazione.dataCheckOut + " " + datiPrenotazione.orarioCheckOut,
            datiPrenotazione.prezzo,
            datiPrenotazione.adulti,
            datiPrenotazione.bambini,
            datiPrenotazione.adultiEsenti,
            datiPrenotazione.bambiniEsenti,
            datiPrenotazione.metodoPagamento,
            datiPrenotazione.idUtente,
            datiPrenotazione.idStruttura
        ];

        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(query, datiQuery).catch((err) => {console.log(err)});
                if (risultato && risultato.insertId) return res(risultato.insertId);
                else throw createError(400);
            })
        } catch(err) {
            console.log(err);
            throw createError(500);
        }
    },

    delete: async function (idPrenotazione, res) {
        const db = await makeDb(config);

        let query = `DELETE FROM prenotazione WHERE idPrenotazione = ?`;

        try {
            await withTransaction(db, async () => {
                let result = await db.query(query, [idPrenotazione]).catch((err) => {console.log(err)});

                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
                else return result;
            })
        } catch(err) {
            console.log(err);
            throw createError(500);
        }
    },

    getPrenotazioni: async function(dati, callback){
        idStruttura=dati.idStruttura;
        const db=await makeDb(config);
        try{
           await withTransaction(db,async()=> {
               let listaPrenotazioni = await db.query('SELECT prenotazione.*,utente.*, autenticazione.email FROM prenotazione JOIN utente JOIN autenticazione WHERE prenotazione.refStruttura=? AND prenotazione.refUtente=utente.idUtente AND utente.idUtente =autenticazione.refUtente',
                   [[[idStruttura]]]).catch(err => {throw err;});
               if (dati.tipologiaStruttura === "B&B"){
                   for (let i = 0; i < listaPrenotazioni.length; i++) {
                       let indice = listaPrenotazioni[i].idPrenotazione;
                       let camere = await db.query('SELECT * FROM `cameraB&B` JOIN prenotazioneCamera WHERE `cameraB&B`.idCamera=prenotazioneCamera.refCamera AND prenotazioneCamera.refPrenotazione=?',
                           [indice]).catch(err=>{throw err});
                       let array=[];
                       for (let i = 0; i < camere.length; i++) {
                           array.push(camere[i]);
                       }
                       listaPrenotazioni[i]["camere"] = array;
                   }
               }
               return callback(listaPrenotazioni);
           });
        }
        catch(err){
            console.log(err);
        }
    },

    rifiutaPrenotazione: async function(data){
        const db = await makeDb(config);
        console.log("id"+data.idPrenotazione);
        try {
            await withTransaction(db, async () => {
                let camere = await db.query(`DELETE FROM prenotazioneCamera WHERE refPrenotazione = ?`, data.idPrenotazione).catch((err) => {console.log(err)});
                console.log(camere);
                let result = await db.query(`DELETE FROM prenotazione WHERE idPrenotazione = ?`, data.idPrenotazione).catch((err) => {console.log(err)});
                console.log(result);
                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
            })
        } catch(err) {
            throw err;
        }
    },

    confermaPrenotazione: async function(data){
        const db = await makeDb(config);
        let dataConferma=new Date();
        console.log("sto per confermare");
        try {
            await withTransaction(db, async () => {
                let result = await db.query('UPDATE prenotazione SET prenotazione.confermata=1 , prenotazione.dataScadenza=null , prenotazione.dataConferma=? WHERE idPrenotazione = ?', [dataConferma,data.idPrenotazione]).catch((err) => {throw err});
                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
            })
        } catch(err) {
            throw err;
        }
    },

    getPrenotazioniUtente: async function(idUtente, callback){

        let query = `
            SELECT prenotazione.*, struttura.*, utente.idUtente, autenticazione.email, fotografie.percorso as foto
            FROM prenotazione
                     JOIN struttura
                     JOIN fotografie
                     JOIN utente
                     JOIN autenticazione
            WHERE prenotazione.refUtente = ?
              AND prenotazione.refStruttura = struttura.idStruttura
              AND struttura.refGestore = utente.idUtente
              AND utente.idUtente = autenticazione.refUtente
              AND fotografie.idFoto = (
                SELECT F2.idFoto
                FROM fotografie as F2
                WHERE F2.refStruttura = struttura.idStruttura
                LIMIT 1
            )
            ORDER BY prenotazione.checkIn
        `

        let queryBB = `
        SELECT *
        FROM \`cameraB&B\` as CBB, prenotazioneCamera as PC
        WHERE CBB.refStruttura = PC.refStruttura
          AND CBB.idCamera = PC.refCamera 
          AND PC.refPrenotazione = ?
        `

        const db=await makeDb(config);
        try{
            await withTransaction(db,async()=> {

                let listaPrenotazioni = await db.query(query, [idUtente]).catch(err => {
                    throw err;
                });

                for (let i = 0; i < listaPrenotazioni.length; i++) {
                    let idPrenotazione = listaPrenotazioni[i].idPrenotazione;

                    if (listaPrenotazioni[i].tipologiaStruttura === "B&B") {
                        let camere = await db.query(queryBB, [idPrenotazione]).catch(err=>{throw err});


                        let array = [];

                        for (let i = 0; i < camere.length; i++) {
                            array.push(camere[i]);
                        }

                        listaPrenotazioni[i].camere = array;
                    }
                }

                return callback(listaPrenotazioni);
            });
        }
        catch(err){
            console.log(err);
        }
    },

    rendiconto: async function(dati, callback) {
        console.log(dati.trimestre, dati.rendicontoEffettuato)
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                let risultato = await db.query(('SELECT P.idPrenotazione FROM prenotazione AS P  \
                    WHERE P.refStruttura = ? AND P.checkIn < ? AND P.checkIn >?'), [dati.idStruttura, dati.trimestre, dati.rendicontoEffettuato]).catch((err) => {throw err});
                return callback(risultato);
            })
        }
        catch (err) {
            throw err;
        }

    }
}
