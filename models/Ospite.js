const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');

module.exports = {
    aggiungi: async function(data, callback) {
        const db = await makeDb()

        let datiOspite = data.listaOspiti;
        let refprenotazione = data.refprenotazione;
        let refindirizzo, refOspite;

        const qryIndirizzo = `
            INSERT INTO indirizzo (via, numerocivico, cap, refcomune)
            VALUES ($1::text, $2::integer, $3::text, $4::integer)
            RETURNING idindirizzo`

        const qryOspite = `
            INSERT INTO ospite (nome, cognome, codicefiscale, datanascita, refindirizzo, refcomunenascita, refprenotazione, tassa, dataarrivo, permanenza) 
            VALUES ($1::text, $2::text, $3::text, $4::date, $5::integer, $6::integer, $7::integer, $8::numeric, $9::date, $10::integer)
            RETURNING idospite`

        const qryDocumento = `
            INSERT INTO documenti (percorso, refprenotazione)
            VALUES ($1::text, $2::integer)
            RETURNING iddocumento`

        try {
            await withTransaction(db, async () => {
                let argsIndirizzo, argsOspite, argsDocumento;
                let resIndirizzo, resOspite, resDocumento;

                for (let i = 0; i < datiOspite.length; i++) {
                    // Inserimento indirizzo
                    argsIndirizzo = [
                        datiOspite[i].via,
                        datiOspite[i].numerocivico,
                        datiOspite[i].cap,
                        datiOspite[i].refcomuneresidenza
                    ]

                    resIndirizzo = await db.query(qryIndirizzo, argsIndirizzo)
                    refindirizzo = resIndirizzo.rows[0].idindirizzo

                    // Inserimento ospite
                    argsOspite = [
                        datiOspite[i].nome,
                        datiOspite[i].cognome,
                        datiOspite[i].codicefiscale,
                        datiOspite[i].datanascita,
                        refindirizzo,
                        datiOspite[i].refcomunenascita,
                        refprenotazione,
                        datiOspite[i].tassa,
                        datiOspite[i].dataarrivo,
                        datiOspite[i].permanenza
                    ]

                    resOspite = await db.query(qryOspite, argsOspite)
                    refOspite = resOspite.rows[0].idospite

                    // Inserimento documento
                    if (datiOspite[i].documenti) {
                        for (documento of datiOspite[i].documenti) {
                            argsDocumento = [documento, refprenotazione]
                            resDocumento = await db.query(qryDocumento, argsDocumento)
                        }
                    }
                }

                return callback();
            });
        }
        catch (err) {
            console.error(err)
            throw createError(500);
        }
    },

    fetch: async function (refprenotazione, callback) {
        const db = await makeDb()

        const qry = `
            SELECT o.idospite, o.nome, o.cognome, o.codicefiscale, o.datanascita, o.refcomunenascita, o.tassa,
                   o.dataarrivo, o.permanenza, o.refprenotazione, i.via, i.numerocivico, i.cap, 
                   cn.nomecomune as comunenascita, pn.nomeprovincia as provincianascita,
                   rn.nomeregione as regionenascita, cr.nomecomune as comuneresidenza, 
                   cr.idcomune AS refcomuneresidenza, pr.nomeprovincia AS provinciaresidenza, 
                   rr.nomeregione AS regioneresidenza
            FROM ospite o 
                JOIN indirizzo i on o.refindirizzo = i.idindirizzo 
                JOIN comuni cr on i.refcomune = cr.idcomune 
                JOIN province pr on cr.refprovincia = pr.idprovincia
                JOIN regioni rr on pr.refregione = rr.idregione
                JOIN comuni cn on o.refcomunenascita = cn.idcomune
                JOIN province pn on cn.refprovincia = pn.idprovincia
                JOIN regioni rn on pn.refregione = rn.idregione
            WHERE o.refprenotazione = $1::integer`

        try {
            const res = await db.query(qry, [refprenotazione])
            return callback(res.rows)
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    invioDichiarazione: async function (dati, callback) {
        const db = await makeDb()
        const qry = `
            SELECT d.percorso, d.iddocumento
            FROM documenti d
            WHERE d.refprenotazione = $1::integer`

        try {
            const res = await db.query(qry, [dati.refprenotazione])
            return callback(res.rows)
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    }
};
