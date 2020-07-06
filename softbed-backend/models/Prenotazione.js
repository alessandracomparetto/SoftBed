const {makeDb, withTransaction} = require('../db/dbmiddleware');
const {config} = require("../db/config");
const createError = require('http-errors');

module.exports = {

    create: async function (datiPrenotazione, callback) {
        const db = await makeDb(config);

        const dataCheckIn = new Date(datiPrenotazione.dataCheckIn);
        const dataCheckOut = new Date(datiPrenotazione.dataCheckOut);

        const GIORNO = 86400000;
        const giorni = Math.ceil((dataCheckOut.getTime() - dataCheckIn.getTime()) / GIORNO);

        const annoCI = dataCheckIn.getFullYear();
        const inizio = annoCI + "-01-01"
        const fine = annoCI + "-12-31"

        let queryGiorni = `
        SELECT SUM(DATEDIFF(P.checkOut, P.checkIn)) as giorni
            FROM prenotazione as P
            WHERE P.refUtente = ?
              AND P.refStruttura = ?
              AND P.checkIn >= '${inizio}'
              AND P.checkIn <= '${fine}'`

        let query = ('INSERT INTO `prenotazione` (checkIn, checkOut, costo, nAdulti, nBambini, nEsentiAdulti, nEsentiBambini, refMetodoPagamento, refUtente, refStruttura, dataScadenza) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

        let tmp = new Date(new Date().getTime() + 172800000).toISOString().split("T");
        const scadenza = tmp[0] + " " + tmp[1].slice(0, 10);

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
            datiPrenotazione.idStruttura,
            scadenza
        ];

        try {
            await withTransaction(db, async () => {

                // CONTROLLO SUI 28 GIORNI
                let tmp = await db.query(queryGiorni, [datiPrenotazione.idUtente, datiPrenotazione.idStruttura])
                    .catch((err) => {console.log(err)});

                console.log(tmp[0].giorni + giorni);
                if (tmp[0].giorni + giorni > 28) throw createError(403, "Non è possibile alloggiare nella stessa struttura per più di 28 giorni in un anno.");

                // QUERY PER IL RISULTATO
                let risultato = await db.query(query, datiQuery).catch((err) => {throw err});
                if (risultato && risultato.insertId) {
                    let richiedente = await db.query('SELECT email as emailOspite FROM autenticazione WHERE refUtente=?', datiPrenotazione.idUtente).catch((err) => {throw err});
                    let gestore = await db.query('SELECT autenticazione.email as emailGestore , struttura.nomeStruttura FROM struttura JOIN autenticazione WHERE struttura.refGestore=autenticazione.refUtente AND  \
                       struttura.idStruttura=?', datiPrenotazione.idStruttura);

                    let ritorno = {"emailOspite": richiedente[0].emailOspite, "emailGestore":gestore[0].emailGestore, "nomeStruttura":gestore[0].nomeStruttura,
                    "idPrenotazione":risultato.insertId, "checkIn":datiPrenotazione.dataCheckIn, "checkout":datiPrenotazione.dataCheckOut}
                    return callback(ritorno);
                }
            })
        } catch(err) {
            if (err.code && err.code === "ER_DUP_ENTRY") {
                throw createError(403, "È gia presente una prenotazione con questi dati.");
            } else if (err.status && err.status === 403) {
                throw err;
            } else { createError(500) }
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
                       let camere = await db.query('SELECT * FROM `camerab&b` JOIN prenotazionecamera WHERE `camerab&b`.idCamera=prenotazionecamera.refCamera AND prenotazionecamera.refPrenotazione=?',
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
                let camere = await db.query(`DELETE FROM prenotazionecamera WHERE refPrenotazione = ?`, data.idPrenotazione).catch((err) => {console.log(err)});
                console.log(camere);
                let result = await db.query(`DELETE FROM prenotazione WHERE idPrenotazione = ?`, data.idPrenotazione).catch((err) => {console.log(err)});
                console.log(result);
                if (result.affectedRows === 0) throw createError(404, "Prenotazione non trovata");
            })
        } catch(err) {
            throw err;
        }
    },

    confermaPrenotazione: async function(data, callback){
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
        FROM \`camerab&b\` as CBB, prenotazionecamera as PC
        WHERE CBB.refStruttura = PC.refStruttura
          AND CBB.idCamera = PC.refCamera 
          AND PC.refPrenotazione = ?
        `

        const db=await makeDb(config);
        try{
            await withTransaction(db,async()=> {

                let listaPrenotazioni = await db.query(query, [idUtente]).catch(err => {
                    // throw err;
                    console.log(err);
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

    rendiconto: async function (dati, callback) {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                //recupero le informazioni generali della struttura
                let prenotazioni = await db.query(('SELECT P.idPrenotazione FROM prenotazione AS P\
                    WHERE P.refStruttura = ? AND P.checkIn <= ? AND P.checkIn >?'), [dati.idStruttura, dati.trimestre, dati.rendiconto]).catch((err) => {throw (err)});
                console.log("PRENOTAZIONI: ", prenotazioni);
                for (let i = 0; i < prenotazioni.length; ++i) {
                    let indice = prenotazioni[i].idPrenotazione;
                    let ospiti = await db.query('SELECT O.nome, O.cognome, O.codiceFiscale, O.dataNascita, O.dataArrivo, O.permanenza, O.tassa, I.via, I.numeroCivico, I.cap, CN.nomeComune as comuneNascita, PN.nomeProvincia AS provinciaNascita,\
                    RN.nomeRegione AS regioneNascita, CR.nomeComune as comuneResidenza, CR.idComune AS refComuneResidenza, PR.nomeProvincia AS provinciaResidenza, RR.nomeRegione AS regioneResidenza\
                    FROM `ospite` AS O JOIN `indirizzo` AS I ,`comuni` as CR , `province` as PR, `regioni` as RR, `comuni` AS CN , `province` AS PN, `regioni` AS RN\
                    WHERE  O.refPrenotazione= ? AND  O.refIndirizzo=I.idIndirizzo AND I.refComune=CR.idComune\
                    AND `CR`.refProvincia = `PR`.idProvincia AND `PR`.refRegione = `RR`.idRegione AND O.refComuneNascita = `CN`.idComune\
                    AND `CN`.refProvincia = `PN`.idProvincia AND `PN`.refRegione = `RN`.idRegione' ,[indice]).catch(err=>{throw err});
                        let array=[];
                        console.log(indice);
                        for (let i = 0; i < ospiti.length; i++) {
                            array.push(ospiti[i]);
                        }
                        prenotazioni[i]["ospiti"] = array;
                    }
                return callback(prenotazioni);
            });
        } catch (err) {
            throw err;
        }
    },
}
