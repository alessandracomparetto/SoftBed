const {makeDb, withTransaction} = require('../db/dbmiddleware');
const createError = require('http-errors');

module.exports = {

    create: async function (datiPrenotazione, callback) {
        const db = await makeDb()

        const dataCheckIn = new Date(datiPrenotazione.dataCheckIn);
        const dataCheckOut = new Date(datiPrenotazione.dataCheckOut);

        const GIORNO = 86400000;
        const giorni = Math.ceil((dataCheckOut.getTime() - dataCheckIn.getTime()) / GIORNO);

        const annoCI = dataCheckIn.getFullYear();
        const inizio = annoCI + "-01-01"
        const fine = annoCI + "-12-31"

        const queryGiorni = `
        SELECT SUM(DATE_PART('day', P.checkout - P.checkin)) as giorni
            FROM prenotazione as P
            WHERE P.refutente = $1::integer
              AND P.refstruttura = $2::integer
              AND P.checkin >= $3::date
              AND P.checkin <= $4::date`

        const qry = ` 
            INSERT INTO prenotazione (
                checkin, 
                checkout, 
                costo, 
                nadulti, 
                nbambini, 
                nesentiadulti, 
                nesentibambini, 
                refmetodopagamento, 
                refutente, 
                refstruttura, 
                datascadenza
            ) VALUES (
                $1::timestamp,
                $2::timestamp,
                $3::float,
                $4::integer,
                $5::integer,
                $6::integer,
                $7::integer,
                $8::integer,
                $9::integer,
                $10::integer,
                $11::timestamp
            )
            RETURNING idprenotazione`

        const scadenza = new Date(new Date().getTime() + 172800000)

        const args = [
            datiPrenotazione.dataCheckIn + " " + datiPrenotazione.orarioCheckIn,
            datiPrenotazione.dataCheckOut + " " + datiPrenotazione.orarioCheckOut,
            datiPrenotazione.prezzo,
            datiPrenotazione.adulti,
            datiPrenotazione.bambini,
            datiPrenotazione.adultiEsenti,
            datiPrenotazione.bambiniEsenti,
            datiPrenotazione.metodoPagamento,
            datiPrenotazione.idutente,
            datiPrenotazione.idstruttura,
            scadenza
        ];

        try {
            await withTransaction(db, async () => {

                // CONTROLLO SUI 28 GIORNI
                let tmp = await db.query(
                    queryGiorni,
                    [datiPrenotazione.idutente, datiPrenotazione.idstruttura, inizio, fine]
                )

                if (tmp.rows[0].giorni + giorni > 28) {
                    throw createError(
                        403,
                        "Non è possibile alloggiare nella stessa struttura per più di 28 giorni in un anno."
                    );
                }

                // QUERY PER IL RISULTATO
                const res = await db.query(qry, args)
                if (res.rows[0] && res.rows[0].idprenotazione) {
                    // Richiedente
                    const richiedente = await db.query(
                        `SELECT email as emailospite FROM autenticazione WHERE refutente = $1::integer`,
                        [datiPrenotazione.idutente]
                    )

                    // Gestore
                    const gestore_qry = `
                        SELECT A.email as emailgestore, S.nomestruttura
                        FROM struttura S JOIN autenticazione A ON S.refgestore = A.refutente
                        WHERE S.idstruttura = $1::integer`

                    const gestore = await db.query(
                        gestore_qry,
                        [datiPrenotazione.idstruttura]
                    )

                    const ritorno = {
                        "emailospite": richiedente.rows[0].emailospite,
                        "emailgestore": gestore.rows[0].emailgestore,
                        "nomestruttura": gestore.rows[0].nomestruttura,
                        "idprenotazione": res.rows[0].idprenotazione,
                        "checkin": datiPrenotazione.dataCheckIn,
                        "checkout": datiPrenotazione.dataCheckOut
                    }

                    return callback(ritorno);
                }
            })
        } catch(err) {
            console.error(err)
            if (err.code && err.code === '23505') {
                throw createError(403, "È gia presente una prenotazione con questi dati.");
            } else if (err.status && err.status === 403) {
                throw err;
            } else { createError(500) }
        }
    },

    delete: async function (idprenotazione) {
        const db = await makeDb()
        const qry = `DELETE FROM prenotazione WHERE idprenotazione = $1::integer`
        let res

        try {
            res = await db.query(qry, [idprenotazione])
        } catch(err) {
            console.error(err);
            throw createError(500);
        } finally {
            db.connRelease()
        }

        if (res.rowCount === 0) {
            throw createError(404, "Prenotazione non trovata")
        }
        else return res.rows[0]
    },

    getPrenotazioni: async function(dati, callback) {
        const idstruttura = dati.idstruttura;

        const db = await makeDb()

        try {
            await withTransaction(db,async()=> {

                const qryPrenotazioni = `
                    SELECT p.*, u.*, a.email
                    FROM prenotazione p 
                        JOIN utente u on p.refutente = u.idutente
                        JOIN autenticazione a on u.idutente = a.refutente
                    WHERE p.refstruttura = $1::integer`

                const res = await db.query(qryPrenotazioni, [idstruttura])
                let listaPrenotazioni = res.rows

                if (dati.tipologiastruttura === "B&B") {
                    const qryCamere = `
                        SELECT *
                        FROM "camerab&b" JOIN prenotazionecamera p on "camerab&b".idcamera = p.refcamera
                        WHERE p.refprenotazione = $1::integer`

                    for (let i = 0; i < listaPrenotazioni.length; i++) {
                       let idprenotazione = listaPrenotazioni[i].idprenotazione;
                       const resCamere = await db.query(qryCamere, [idprenotazione])

                       listaPrenotazioni[i]["camere"] = resCamere.rows;
                    }
                }

                return callback(listaPrenotazioni);
           });
        } catch(err) {
            console.error(err)
            throw createError(500)
        }
    },

    rifiutaPrenotazione: async function(data){
        const db = await makeDb()

        try {
            await withTransaction(db, async () => {
                const resCamere = await db.query(
                    `DELETE FROM prenotazionecamera WHERE refprenotazione = $1::integer`,
                    [data.idprenotazione]
                )

                const resPrenotazioni = await db.query(
                    `DELETE FROM prenotazione WHERE idprenotazione = $1::integer`,
                    [data.idprenotazione]
                )

                if (resPrenotazioni.rowCount === 0) throw createError(404, "Prenotazione non trovata");
            })
        } catch(err) {
            console.error(err)
            throw createError(500);
        }
    },

    confermaPrenotazione: async function(data, callback){
        const db = await makeDb()
        let dataconferma = new Date();

        const qryUpdate = `
            UPDATE prenotazione
            SET confermata = True, datascadenza = null, dataconferma = $1::timestamp
            WHERE idprenotazione = $2::integer`

        const qrySelect = `
            SELECT p.*, a.email as emailgestore, s.nomestruttura
            FROM prenotazione p 
                JOIN struttura s on p.refstruttura = s.idstruttura 
                JOIN autenticazione a on s.refgestore = a.refutente
            WHERE p.idprenotazione = $1::integer`

        try {
            await withTransaction(db, async () => {
                let result = await db.query(qryUpdate, [dataconferma, data.idprenotazione]).catch((err) => {throw err});

                if (result.rowCount === 0) throw createError(404, "Prenotazione non trovata");

                let prenotazione = await db.query(qrySelect, [data.idprenotazione]);

                return callback(prenotazione.rows[0]);
            })
        } catch(err) {
            throw err;
        }
    },

    getPrenotazioniUtente: async function(idutente, callback) {
        const qry = `
            SELECT P.*, S.*, U.idutente, A.email, F.percorso as foto
            FROM prenotazione P, struttura S, fotografie F, utente U, autenticazione A
            WHERE P.refutente = $1::integer AND
                  P.refstruttura = S.idstruttura AND
                  S.refgestore = U.idutente AND
                  U.idutente = A.refutente AND
                  F.idfoto = (
                SELECT F2.idfoto
                FROM fotografie F2
                WHERE F2.refstruttura = S.idstruttura
                LIMIT 1
            )
            ORDER BY P.checkin
        `

        let qryBB = `
        SELECT *
        FROM "camerab&b" CBB 
            JOIN prenotazionecamera PC ON CBB.idcamera = PC.refcamera AND CBB.refstruttura = PC.refstruttura
        WHERE PC.refprenotazione = $1::integer`

        const db = await makeDb()
        try {
            const res_prenotazioni = await db.query(qry, [idutente])

            for (let i = 0; i < res_prenotazioni.rows.length; i++) {
                let idprenotazione = res_prenotazioni.rows[i].idprenotazione
                let tipologiastruttura = res_prenotazioni.rows[i].tipologiastruttura

                if (tipologiastruttura === "B&B") {
                    let res_camere = await db.query(qryBB, [idprenotazione])

                    let arr = []

                    for (let j in res_camere.rows) {
                        arr.push(res_camere.rows[i])
                    }

                    res_prenotazioni.rows[i].camere = arr
                }
            }

            return callback(res_prenotazioni.rows)
        } catch(err){
            console.error(err)
            throw createError(500)
        }
    },

    setDichiarazione: async function(data, callback) {
        const db = await makeDb()
        const qry = `
            UPDATE prenotazione 
            SET dichiarazioneospiti = true 
            WHERE idprenotazione = $1::integer`
        try {
            await db.query(qry, [data.refprenotazione])
            return(callback())
        } catch(err) {
            console.error(err)
            throw createError()
        } finally {
            db.connRelease()
        }
    },
}
