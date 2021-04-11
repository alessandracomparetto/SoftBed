const { makeDb, withTransaction } = require('../db/dbmiddleware');
const createError = require('http-errors');


const StrutturaEntity = require('./StrutturaEntity');
const ListaStrutture = require('./ListaStruttureEntity');


module.exports= {
    inserisciStruttura: async function (datiStruttura, callback) {
        const db = await makeDb()
        let refindirizzo, refstruttura;

        try {
            await withTransaction(db, async () => {
                // Inserimento indirizzo
                const qryIndirizzo = `
                    INSERT INTO indirizzo (via, numerocivico, cap, refcomune)
                    VALUES ($1::text, $2::integer, $3::text, $4::integer)
                    RETURNING idindirizzo`

                const argsIndirizzo = [
                    datiStruttura.via,
                    datiStruttura.numerocivico,
                    datiStruttura.cap,
                    datiStruttura.refcomune
                ]

                const resIndirizzo = await db.query(qryIndirizzo, argsIndirizzo)
                refindirizzo = resIndirizzo.rows[0].idindirizzo
                let giorno = new Date().toISOString().slice(0, 10)

                // Inserimento struttura
                const qryStruttura = `
                    INSERT INTO struttura (nomestruttura, tipologiastruttura, refgestore, refindirizzo, rendicontoeffettuato)
                    VALUES ($1::text, $2::text, $3::integer, $4::integer, $5::date)
                    RETURNING idstruttura`

                const argsStruttura = [
                    datiStruttura.nomestruttura,
                    datiStruttura.tipologiastruttura,
                    datiStruttura.idutente,
                    refindirizzo,
                    giorno
                ]

                const resStruttura = await db.query(qryStruttura, argsStruttura)
                refstruttura = resStruttura.idstruttura

                // Inserimento fotografie
                const qryFoto = `
                    INSERT INTO fotografie (refstruttura, percorso)
                    VALUES ($1::integer, $2::text)`
                let argsFoto

                if (datiStruttura.foto) {
                    for (let foto of datiStruttura.foto) {
                        argsFoto = [refstruttura, foto];
                        await db.query(qryFoto, argsFoto)
                    }
                }

                // Inserimento condizioni
                const qryCondizioni = `
                    INSERT INTO condizioni (refstruttura, minsoggiorno, maxsoggiorno, orainiziocheckin, 
                                            orainiziocheckout, orafinecheckin, orafinecheckout, prezzobambini, 
                                            pagamentoloco, pagamentoonline, prezzoadulti, anticipoprenotazionemin, 
                                            anticipoprenotazionemax, politicacancellazione, penalecancellazione, 
                                            preavvisodisdetta, refnumerocarta) 
                    VALUES ($1::integer, $2::integer, $3::integer, $4::time, $5::time, $6::time, $7::time, $8::bool,
                            $9::bool, $10::numeric, $11::numeric, $12::integer, $13::integer, $14::text, $15::numeric,
                            $16::integer, $17::text)`

                const argsCondizioni = [
                    refstruttura,
                    datiStruttura.minsoggiorno, datiStruttura.maxsoggiorno,
                    datiStruttura.orainiziocheckin, datiStruttura.orainiziocheckout,
                    datiStruttura.orafinecheckin, datiStruttura.orafinecheckout,
                    datiStruttura.pagamentoloco, datiStruttura.pagamentoonline,
                    datiStruttura.prezzobambini, datiStruttura.prezzoadulti,
                    datiStruttura.anticipoprenotazionemin, datiStruttura.anticipoprenotazionemax,
                    datiStruttura.politicacancellazione, datiStruttura.prezzoCancellazione,
                    datiStruttura.preavvisodisdetta,
                    datiStruttura.refnumerocarta
                ]

                await db.query(qryCondizioni, argsCondizioni)

                // Inserimento struttura per tipologia
                let qryTipologia, argsTipologia;

                // Query B&B
                if (datiStruttura.tipologiastruttura === "B&B") {
                    qryTipologia = `
                        INSERT INTO "b&b" (refstruttura, bambini, ariacondizionata, wifi, riscaldamento, parcheggio,
                                           strutturadisabili, animaliammessi, permessofumare, tv, cucinaceliaci,
                                           navettaaeroportuale, servizioincamera, descrizione) 
                        VALUES ($1::integer, $2::bool, $3::bool, $4::bool, $5::bool, $6::bool, $7::bool, $8::bool,
                                $9::bool, $10::bool, $11::bool, $12::bool, $13::bool, $14::text)`

                    argsTipologia = [
                        refstruttura, datiStruttura.bambini, datiStruttura.ariacondizionata, datiStruttura.wifi,
                        datiStruttura.riscaldamento, datiStruttura.parcheggio, datiStruttura.strutturadisabili,
                        datiStruttura.animaliammessi, datiStruttura.permessofumare, datiStruttura.tv,
                        datiStruttura.cucinaceliaci, datiStruttura.navettaaeroportuale, datiStruttura.servizioincamera,
                        datiStruttura.descrizione
                    ];

                    await db.query(qryTipologia, argsTipologia)

                    // Inserimento camere
                    const qryCamere = `
                        INSERT INTO "camerab&b" (refstruttura, idcamera, tipologiacamera, nlettisingoli, 
                                                 nlettimatrimoniali, prezzobaseanotte)
                        VALUES ($1::integer, $2::integer, $3::text, $4::smallint, $5::smallint, $6::numeric)`

                    let argsCamere;

                    for (camera of datiStruttura.camere) {
                        argsCamere = [
                            refstruttura, camera.tipologiacamera, camera.nlettisingoli, camera.nlettimatrimoniali,
                            camera.prezzobaseanotte
                        ];

                        await db.query(qryCamere, argsCamere)
                    }

                }
                // Query Case Vacanza
                else if (datiStruttura.tipologiastruttura === "cv") {
                    qryTipologia = `
                        INSERT INTO casavacanze (refstruttura, bambini, riscaldamento, ariacondizionata, wifi, 
                                                 parcheggio, strutturadisabili, animaliammessi, permessofumare, 
                                                 festeammesse, tv, salotto, giardino, terrazza, piscina, nbagni, 
                                                 ncamere, nlettisingoli, nlettimatrimoniali, prezzonotte, descrizione) 
                        VALUES ($1::integer, $2::bool, $3::bool, $4::bool, $5::bool, $6::bool, $7::bool, $8::bool,
                                $9::bool, $10::bool, $11::bool, $12::bool, $13::bool, $14:bool, $15::bool, $16::integer,
                                $17::integer, $18::smallint, $19::smallint, $20::numeric, $21::text)`

                    argsTipologia = [
                        refstruttura, datiStruttura.bambini, datiStruttura.riscaldamento,
                        datiStruttura.ariacondizionata, datiStruttura.wifi, datiStruttura.parcheggio,
                        datiStruttura.strutturadisabili, datiStruttura.animaliammessi, datiStruttura.permessofumare,
                        datiStruttura.festeammesse, datiStruttura.tv, datiStruttura.salotto, datiStruttura.giardino,
                        datiStruttura.terrazza, datiStruttura.piscina, datiStruttura.nbagni, datiStruttura.ncamere,
                        datiStruttura.nlettisingoli, datiStruttura.nlettimatrimoniali, datiStruttura.prezzonotte,
                        datiStruttura.descrizione
                    ];

                    await db.query(qryTipologia, argsTipologia)
                }

                const qry = `
                    SELECT s.*, i.*, a.email as emailgestore
                    FROM struttura s 
                        JOIN indirizzo i on s.refindirizzo = i.idindirizzo 
                        JOIN autenticazione a on s.refgestore = a.refutente
                    WHERE s.refgestore = $1::integer`

                const res = await db.query(qry, [datiStruttura.idutente])
                return callback(res.rows);
            });
        } catch (err) {
            console.error(err);
            throw createError(500);
        }
    },

    fetch: async function (dati, callback) {
        let idstruttura = dati.idstruttura;
        let tipologiastruttura = dati.tipologiastruttura;
        let refgestore = dati.refgestore;

        const db = await makeDb()
        let qry

        try {
            if (tipologiastruttura === "cv") {
                qry = `
                    SELECT *
                    FROM struttura s 
                        JOIN indirizzo i ON s.refindirizzo = i.idindirizzo 
                        JOIN condizioni c ON s.idstruttura = c.refstruttura
                        JOIN casavacanze cv ON s.idstruttura = cv.refstruttura
                        JOIN comuni co ON I.refcomune = co.idcomune
                        JOIN province p ON co.refprovincia = p.idprovincia
                        JOIN regioni r on p.refregione = r.idregione
                    WHERE S.idstruttura = $1::integer 
                      AND S.refgestore = $2::integer`
            }
            else if (tipologiastruttura === "B&B") {
                qry = `
                    SELECT *
                    FROM struttura s
                             JOIN indirizzo i ON s.refindirizzo = i.idindirizzo
                             JOIN condizioni c ON s.idstruttura = c.refstruttura
                             JOIN "b&b" bb ON s.idstruttura = bb.refstruttura
                             JOIN comuni co ON I.refcomune = co.idcomune
                             JOIN province p ON co.refprovincia = p.idprovincia
                             JOIN regioni r on p.refregione = r.idregione
                    WHERE S.idstruttura = $1::integer
                      AND S.refgestore = $2::integer`
            }

            const res = await db.query(qry, [idstruttura, refgestore])

            if (tipologiastruttura === "B&B") {
                const camereQry = `
                    SELECT *
                    FROM "camerab&b" cbb
                    WHERE cbb.refstruttura = $1::integer`

                const camereRes = await db.query(camereQry, [idstruttura])

                res.rows[0]["camere"] = camereRes.rows
            }

            const fotoQry = `
                SELECT percorso
                FROM fotografie f
                WHERE f.refstruttura = $1::integer`

            const fotoRes = await db.query(fotoQry, [idstruttura])

            res.rows[0]["foto"] = fotoRes.rows.map((fotoObj) => fotoObj.percorso)

            return callback(res.rows[0])

        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    modificaCondizioni: async function (struttura, callback) {
        const db = await makeDb()

        const qry = `
            UPDATE condizioni
            SET minsoggiorno = $1::integer, maxsoggiorno = $2::integer, orainiziocheckin = $3::time, 
                orainiziocheckout = $4::time, orafinecheckin = $5::time, orafinecheckout = $6::time,
                pagamentoloco = $7::bool, pagamentoonline = $8::bool, prezzobambini = $9::numeric, 
                prezzoadulti = $10::numeric, anticipoprenotazionemin = $11:integer, 
                anticipoprenotazionemax = $12::integer, politicacancellazione = $13::text,
                penalecancellazione = $14::numeric, preavvisodisdetta = $15::integer
            WHERE refstruttura = $16::integer`

        const args = [
            struttura.minsoggiorno, struttura.maxsoggiorno, struttura.orainiziocheckin, struttura.orainiziocheckout,
            struttura.orafinecheckin, struttura.orafinecheckout, struttura.pagamentoloco, struttura.pagamentoonline,
            struttura.prezzobambini, struttura.prezzoadulti, struttura.anticipoprenotazionemin,
            struttura.anticipoprenotazionemax, struttura.politicacancellazione, struttura.penalecancellazione,
            struttura.preavvisodisdetta, struttura.idstruttura
        ]

        try {
            const res = await db.query(qry, args)
            return callback(res.rows)
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
             db.connRelease()
        }
    },

    modificaCaratteristicheB: async function (struttura, callback) {
        const db = await makeDb()

        const qry = `
            UPDATE "b&b"
            SET bambini = $1::bool, ariacondizionata = $2::bool, wifi = $3::bool, riscaldamento = $4::bool, 
                parcheggio = $5::bool, strutturadisabili = $6::bool, animaliammessi = $7::bool, 
                permessofumare = $8::bool, tv = $9::bool, cucinaceliaci = $10::bool, navettaaeroportuale = $11::bool, 
                servizioincamera = $12:bool, descrizione = $13::text
            WHERE refstruttura = $14::integer`

        const args = [
            struttura.bambini, struttura.ariacondizionata, struttura.wifi, struttura.riscaldamento,
            struttura.parcheggio, struttura.strutturadisabili, struttura.animaliammessi, struttura.permessofumare,
            struttura.tv, struttura.cucinaceliaci, struttura.navettaaeroportuale, struttura.servizioincamera,
            struttura.descrizione, struttura.idstruttura
        ]

        try {
            const res = await db.query(qry, args)
            return callback(res.rows)
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    modificaCaratteristicheC: async function (struttura, callback) {
        const db = await makeDb()

        const qry = `
            UPDATE casavacanze
            SET bambini = $1::bool, ariacondizionata = $2::bool, wifi = $3::bool, riscaldamento = $4::bool, 
                parcheggio = $5::bool, strutturadisabili = $6::bool, animaliammessi = $7::bool, 
                permessofumare = $8::bool, tv = $9::bool, festeammesse = $10::bool, salotto = $11::bool, 
                giardino = $12:bool, terrazza = $13::bool, piscina = $14::bool, nbagni = $15::integer,
                ncamere = $16::integer, nlettisingoli = $17::smallint, nlettimatrimoniali = $18::smallint,
                prezzonotte= $19::numeric, descrizione = $20::text
            WHERE refstruttura = $21::integer`

        const args = [
            struttura.bambini, struttura.ariacondizionata, struttura.wifi, struttura.riscaldamento,
            struttura.parcheggio, struttura.strutturadisabili, struttura.animaliammessi, struttura.permessofumare,
            struttura.tv, struttura.festeammesse, struttura.salotto, struttura.giardino, struttura.terrazza,
            struttura.piscina, struttura.nbagni, struttura.ncamere, struttura.nlettisingoli,
            struttura.nlettimatrimoniali, struttura.prezzonotte, struttura.descrizione, struttura.idstruttura
        ]

        try {
            const res = await db.query(qry, args)
            return callback(res.rows)
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    carica: async function(idstruttura, callback) {
        let struttura = new StrutturaEntity(idstruttura);
        await struttura.init();
        return callback(struttura);
    },

    cerca: async function(datiRicerca, callback) {
        let listaStrutture = new ListaStrutture(datiRicerca.destinazione, datiRicerca.arrivo, datiRicerca.partenza, datiRicerca.ospiti, datiRicerca.bedAndBreakfast, datiRicerca.casaVacanze);
        await listaStrutture.init();
        return callback(listaStrutture);
    },

    listaStrutture: async function(idGestore,callback) {
        const db = await makeDb()

        try {
            const qry = `
                SELECT *
                FROM struttura JOIN indirizzo i on struttura.refindirizzo = i.idindirizzo
                WHERE struttura.refgestore = $1::integer`

            const res = await db.query(qry, [idGestore])
            return callback(res.rows)
        } catch (err) {
            console.error(err)
            throw createError(500);
        } finally {
            db.connRelease()
        }
    },

    calcoloGuadagno: async function(dati, callback){
        const db = await makeDb()
        let dataInizio = dati.dataInizio;
        let dataFine = dati.dataFine;
        let idstruttura = dati.idstruttura;

        try {
            const qry = `
                SELECT *
                FROM prenotazione p 
                    JOIN condizioni c on p.refstruttura = c.refstruttura
                WHERE p.refstruttura = $1::integer AND 
                      p.confermata = true AND 
                      (p.checkin >= $2::date AND p.checkin <= $3::date) AND 
                      (p.checkout >= $2::date AND p.checkout <= $3::date)`

            const res = await db.query(qry, [idstruttura, dataInizio,  dataFine])

            return callback(res.rows)
        }
        catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    fetchStruttura: async function(dati, callback) {
        const db = await makeDb()

        try {
            const qry = `
                SELECT S.idstruttura, S.nomestruttura, R.nomeregione as regione, P.nomeprovincia as provincia, 
                       C.nomecomune as comune, I.via, I.numerocivico, I.cap, CO.prezzobambini
                FROM struttura S
                    JOIN condizioni CO ON S.idstruttura = CO.refstruttura
                    JOIN indirizzo I ON S.refindirizzo = I.idindirizzo
                    JOIN comuni C ON I.refcomune = C.idcomune
                    JOIN province P ON C.refprovincia = P.idprovincia
                    JOIN regioni R ON P.refregione = R.idregione
                WHERE idstruttura = $1::integer`

            const res = await db.query(qry, [dati.idstruttura])

            return callback(res.rows[0])
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

    setDataRendiconto: async function (info, callback) {
        const db = await makeDb()
        try {
            await withTransaction(db, async () => {
                let results = await db.query('UPDATE struttura SET struttura.rendicontoeffettuato = ? WHERE idstruttura = ?',
                    [info.rendiconto, info.idstruttura])
                    .catch(err => {console.log(err)});
                return callback(results);
            });
        } catch (err) {
            throw err;
        }
    },


    rendiconto: async function (dati, callback) {
        const db = await makeDb()

        try {
            const qry = `
                SELECT P.idprenotazione
                FROM prenotazione P
                WHERE P.refstruttura = $1::integer AND 
                      P.checkin <= $2::date AND P.checkin > $3::date`
            const res = await db.query(qry, [dati.idstruttura, dati.trimestre, dati.rendiconto]);

            const prenotazioni = res.rows

            const qryOspiti = `
                SELECT o.nome, o.cognome, o.codicefiscale, o.datanascita, o.dataarrivo, o.permanenza, o.tassa, i.via, 
                       i.numerocivico, i.cap, cn.nomecomune AS comunenascita, pn.nomeprovincia AS provincianascita,
                       rn.nomeregione AS regionenascita, cr.nomecomune AS comuneresidenza, 
                       pr.nomeprovincia AS provinciaresidenza, rr.nomeregione AS regioneresidenza
                FROM ospite o 
                    JOIN indirizzo i on o.refindirizzo = i.idindirizzo
                    JOIN comuni cr on i.refcomune = cr.idcomune
                    JOIN province pr on cr.refprovincia = pr.idprovincia
                    JOIN regioni rr on pr.refregione = rr.idregione
                    JOIN comuni cn on o.refcomunenascita = cn.idcomune
                    JOIN province pn on cn.refprovincia = pn.idprovincia
                    JOIN regioni rn on pn.refregione = rn.idregione
                WHERE o.refprenotazione = $1::integer`

            for (let i = 0; i < prenotazioni.length; i++) {
                let idprenotazione = prenotazioni[i].idprenotazione;

                const resOspiti = await db.query(qryOspiti, [idprenotazione])
                prenotazioni[i]["ospiti"] = resOspiti.rows
            }

            return callback(prenotazioni);
        } catch (err) {
            console.error(err)
            throw createError(500)
        } finally {
            db.connRelease()
        }
    },

};


