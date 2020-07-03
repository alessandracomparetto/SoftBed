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
                let result = await db.query(query, idPrenotazione).catch(() => {throw createError(500)});

                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
                else return res(result);
            })
        } catch(err) {
            throw err;
        }
    },

    getPrenotazioni: async function(dati, callback){
        idStruttura=dati.idStruttura;
        const db=await makeDb(config);
        console.log(dati);
        try{
           await withTransaction(db,async()=> {
               let listaPrenotazioni = await db.query('SELECT prenotazione.*,utente.*, autenticazione.email FROM prenotazione JOIN utente JOIN autenticazione WHERE prenotazione.refStruttura=? AND prenotazione.refUtente=utente.idUtente AND utente.idUtente =autenticazione.refUtente', [[[idStruttura]]]).catch(err => {
                   throw err;
               });
               if (dati.tipologiaStruttura == "B&B"){
                   for (let i = 0; i < listaPrenotazioni.length; i++) {
                       let indice = listaPrenotazioni[i].idPrenotazione;
                       let camere = await db.query('SELECT * FROM `camerab&b` JOIN prenotazionecamera WHERE `camerab&b`.idCamera=prenotazionecamera.refCamera AND prenotazionecamera.refPrenotazione=?  \
                                                       ', [indice]).catch(err=>{throw err});
                       let array=[];
                       for (let i = 0; i < camere.length; i++) {
                           array.push(camere[i]);
                       }
                       listaPrenotazioni[i]["camere"] = array;
                       console.log(listaPrenotazioni[i]);
                   }
               }
               return callback(listaPrenotazioni);
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
                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
                else return res(result);
            })
        } catch(err) {
            throw err;
        }
    },

    getPrenotazioniUtente: async function(dati, callback){
        idUtente=dati.idUtente;

        const db=await makeDb(config);
        console.log(dati);
        try{
            await withTransaction(db,async()=> {
                let listaPrenotazioni = await db.query('SELECT prenotazione.*,struttura.*,utente.idUtente ,autenticazione.email\
                                                    FROM prenotazione JOIN struttura JOIN utente JOIN autenticazione WHERE prenotazione.refUtente=?\
                                                    AND prenotazione.refStruttura=struttura.idStruttura AND struttura.refGestore=utente.idUtente AND \
                                                    utente.idUtente=autenticazione.refUtente', [[[idUtente]]]).catch(err => {
                    throw err;
                });
                for (let i = 0; i < listaPrenotazioni.length; i++) {
                    let indice = listaPrenotazioni[i].idPrenotazione;
                    if(listaPrenotazioni[i].tipologiaStruttura==="B&B"){
                        let camere = await db.query('SELECT * FROM `camerab&b` JOIN prenotazionecamera WHERE `camerab&b`.idCamera=prenotazionecamera.refCamera AND prenotazionecamera.refPrenotazione=?  \
                                                       ', [indice]).catch(err=>{throw err});
                        let array=[];
                        console.log(indice);
                        for (let i = 0; i < camere.length; i++) {
                            array.push(camere[i]);
                        }
                        listaPrenotazioni[0]["camere"] = array;
                    }
                }
                console.log("RESULTS==========")
                console.log(listaPrenotazioni);
                return callback(listaPrenotazioni);
            });
        }
        catch(err){
            console.log(err);
        }
    },
}
