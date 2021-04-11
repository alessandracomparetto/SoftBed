/* Model dell'utente */
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');

module.exports = {
    inserisci: async function(datiUtente, callback) {
        const db = await makeDb()
        let qry, args, res

        try {
            await withTransaction(db, async () => {
                res = await db.query(
                    'SELECT email FROM autenticazione WHERE autenticazione.email = $1::text',
                    [datiUtente.email]
                )

                if (res.rows.length === 0) { //se non c'è una corrispondenza
                    // Inserimento in utente
                    qry = `
                        INSERT INTO utente (nome, cognome, datanascita, gestore) VALUES 
                            ($1::text, $2::text, $3::date, $4::bool)
                        RETURNING idutente`

                    args = [datiUtente.nome, datiUtente.cognome, datiUtente.datanascita, datiUtente.gestore]
                    res = await db.query(qry, args)

                    const refutente = res.rows[0].idutente

                    // Inserimento in autenticazione
                    qry = `
                        INSERT INTO autenticazione (refutente, email, password) VALUES
                            ($1::integer, $2::text, $3::text)`

                    args = [refutente, datiUtente.email, datiUtente.pass]
                    res = await db.query(qry, args)


                    // Ritorno dati memorizzati / Perché rifare le query se ho appena inserito tutti i dati (?)
                    qry = `
                        SELECT 
                               u.idutente, 
                               u.nome, 
                               u.cognome, 
                               u.codicefiscale, 
                               u.datanascita, 
                               u.refindirizzo, 
                               u.refcomunenascita, 
                               u.telefono, 
                               u.gestore, 
                               a.email
                        FROM utente AS u JOIN autenticazione AS a ON u.idutente = a.refutente
                        WHERE u.idutente = $1::integer`

                    args = [refutente];
                    res = await db.query(qry, args)
                    console.log(res)

                    return (callback(res.rows[0]));
                }
                else{
                    return callback(400)
                }
            });
        }
        catch (err) {
            console.error(err)
            throw(createError(500))
        } finally {
            db.connRelease()
        }
    },

    login: async function(datiUtente, callback) {
        const db = await makeDb()
        try {
            const res = await db.query('SELECT * FROM autenticazione WHERE email = $1::text', [datiUtente.email])

            if (!res.rows[0]) { //email errata
                return callback(404);
            } else {
                if (datiUtente.pass !== res.rows[0].password) { //password errata
                    return callback(400);
                } else {
                    const refutente = res.rows[0].refutente

                    const qry = `
                        SELECT u.idutente, u.nome, u.cognome, u.codicefiscale, u.datanascita, u.refindirizzo, 
                               u.refcomunenascita, u.telefono, u.gestore, a.email
                        FROM utente AS u JOIN autenticazione AS a ON u.idutente = a.refutente
                        WHERE u.idutente = $1::integer`

                    const resUtente = await db.query(qry, [refutente])

                    return (callback(resUtente.rows[0]))
                }
            }
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    fetch: async function (datiUtente, callback) {
        const db = await makeDb()
        let qry

        try {
            if (datiUtente.refindirizzo !== null && datiUtente.refcomunenascita !== null) {
                qry = `
                    SELECT U.idutente, U.nome, U.cognome, U.codicefiscale, U.datanascita, U.refindirizzo, 
                           U.refcomunenascita, U.telefono, U.gestore, A.email, I.via, I.numerocivico, I.cap,
                           CN.nomecomune as comunenascita, PN.nomeprovincia as provincianascita,
                           RN.nomeregione as regionenascita, CR.nomecomune as comuneresidenza,
                           CR.idcomune as refcomuneresidenza, PR.nomeprovincia as provinciaresidenza,
                           RR.nomeregione as regioneresidenza
                    FROM utente U
                             JOIN autenticazione A ON U.idutente = A.refutente
                             JOIN indirizzo I on U.refindirizzo = I.idindirizzo
                             JOIN comuni CN ON U.refcomunenascita = CN.idcomune
                             JOIN province PN ON CN.refprovincia = PN.idprovincia
                             JOIN regioni RN ON PN.refregione = RN.idregione
                             JOIN comuni CR ON I.refcomune = CR.idcomune
                             JOIN province PR ON CR.refprovincia = PR.idprovincia
                             JOIN regioni RR ON PR.refregione = RR.idregione
                    
                    WHERE U.idutente = $1::integer AND 
                          U.refindirizzo = I.idindirizzo AND 
                          I.refcomune = CR.idcomune`
            } else if (datiUtente.refindirizzo !== null) {
                qry = `
                    SELECT U.idutente, U.nome, U.cognome, U.codicefiscale, U.datanascita, U.refindirizzo, U.telefono, 
                           U.gestore, A.email, I.via, I.numerocivico, I.cap, CR.nomecomune as comuneresidenza, 
                           CR.idcomune as refcomuneresidenza, PR.nomeprovincia as provinciaresidenza, 
                           RR.nomeregione as regioneresidenza
                    FROM 
                         utente U 
                             JOIN autenticazione A ON U.idutente = A.refutente 
                             JOIN indirizzo I ON U.refindirizzo = I.idindirizzo 
                             JOIN comuni CR ON I.refcomune = CR.idcomune 
                             JOIN province PR ON CR.refprovincia = PR.idprovincia 
                             JOIN regioni RR ON PR.refregione = RR.idregione
                    WHERE U.idutente = $1::integer`
            } else {
                qry = `
                    SELECT U.idutente, U.nome, U.cognome, U.codicefiscale, U.datanascita, U.telefono, U.gestore, A.email
                    FROM utente U JOIN autenticazione A ON U.idutente = A.refutente
                    WHERE U.idutente = $1::integer`
            }

            const res = await db.query(qry, [datiUtente.idutente])

            callback(res.rows[0])
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    modificaDatiAggiuntivi: async function (datiUtente, callback) {
        const db = await makeDb()

        try {
            await withTransaction(db, async () => {
                let qryIndirizzo, argsIndirizzo

                // Inserimento indirizzi
                if (datiUtente.refindirizzo === null && datiUtente.refcomuneresidenza !== null) {
                    qryIndirizzo = `
                        INSERT INTO indirizzo (via, numerocivico, cap, refcomune) 
                        VALUES ($1::text, $2::integer, $3::text, $4::integer)
                        RETURNING idindirizzo`

                    argsIndirizzo = [datiUtente.via, datiUtente.numerocivico, datiUtente.cap, datiUtente.refcomuneresidenza]
                    const resIndirizzo = await db.query(qryIndirizzo, argsIndirizzo)
                    datiUtente.refindirizzo = resIndirizzo.rows[0].idindirizzo
                } else if (datiUtente.refcomuneresidenza !== null) {
                    qryIndirizzo = `
                        UPDATE indirizzo
                        SET via = $1::text, numerocivico = $2::integer, cap = $3::text, refcomune = $4::integer
                        WHERE idindirizzo = $5::integer`

                    argsIndirizzo = [
                        datiUtente.via, datiUtente.numerocivico, datiUtente.cap, datiUtente.refcomuneresidenza,
                        datiUtente.refindirizzo
                    ]

                    await db.query(qryIndirizzo, argsIndirizzo)
                }

                // Aggiornamento dati utente
                const qryUtente = `
                    UPDATE utente
                    SET codicefiscale = $1::text, datanascita = $2::date, refcomunenascita = $3::integer, 
                        telefono = $4::text, gestore = $5::bool, refindirizzo = $6::integer
                    WHERE idutente = $7::integer`

                const argsUtente = [
                    datiUtente.codicefiscale, datiUtente.datanascita, datiUtente.refcomunenascita, datiUtente.telefono,
                    datiUtente.gestore, datiUtente.refindirizzo, datiUtente.idutente
                ]

                await db.query(qryUtente, argsUtente)

                // NON UTILIZZATE, NON RITORNO NULLA
                // // Ottenimento comuni
                // const qryComune =`
                //     SELECT c.idcomune as refcomuneresidenza, p.nomeprovincia as provinciaresidenza,
                //            r.nomeregione as regioneresidenza
                //     FROM comuni c
                //         JOIN province p on p.idprovincia = c.refprovincia
                //         JOIN regioni r on p.refregione = r.idregione
                //     WHERE c.idcomune = $1::integer`
                //
                // if (datiUtente.refcomunenascita) {
                //     const resNascita = await db.query(qryComune, [datiUtente.refcomunenascita])
                //     nascita = resNascita.rows[0]
                // }
                //
                // if (datiUtente.refcomuneresidenza) {
                //     const resResidenza = await db.query(qryComune, [datiUtente.refcomuneresidenza])
                //     residenza = resResidenza.rows[0]
                // }
                //
                // // Informazioni utente
                // const qry = `
                //     SELECT u.*, a.email
                //     FROM utente u
                //         JOIN autenticazione a on u.idutente = a.refutente
                //     WHERE u.idutente = $1::integer`
                //
                // const res = await db.query(qry, [datiUtente.idutente])
                // let infoUtente = res.rows[0]

                return callback()
                })
        } catch (err) {
            console.error(err)
            throw createError(500)
        }

    },

    aggiungiDatoPagamento:async function(datopagamento, callback) {
        let idutente = datopagamento.idutente;
        const db = await makeDb()

        try {
            const qry = `
                INSERT INTO datopagamento (numerocarta, cvv, nomeintestatario, cognomeintestatario, datascadenza, refutente) 
                VALUES ($1::text, $2::integer, $3::text, $4::text, $5::text, $6::integer)`

            const args = [
                datopagamento.numerocarta, datopagamento.cvv, datopagamento.nomeintestatario,
                datopagamento.cognomeintestatario, datopagamento.datascadenza, idutente
            ]

            await db.query(qry, args)
            return callback()
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    eliminaDatoPagamento: async function(data,res){
        const db = await makeDb()

        console.log("sto per eliminare");
        console.log("id"+data.numerocarta);
        let query = (`DELETE FROM datopagamento WHERE numerocarta = ?`);

        try {
            await withTransaction(db, async () => {
                let result = await db.query(query, data.numerocarta).catch(() => {throw createError(500)});
                console.log(result);
                if (result.rowCount === 0) throw createError(404, "Dato di pagamento non trovata");
                else return res(result);
            })
        } catch(err) {
            throw createError(500);
        }
    },

    getDatiPagamento: async function(data, callback){
        let idutente = data.idutente;
        const db = await makeDb()

        try {
            const res = await db.query(
                "SELECT * FROM datopagamento WHERE refutente = $1::integer",
                [idutente]
            )

            return callback(res.rows)
        } catch(err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },
};

