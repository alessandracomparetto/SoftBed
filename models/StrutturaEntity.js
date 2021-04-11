const createError = require('http-errors');
const Query = require("./QueryStruttura");
const {config} = require("../db/config");
const {makeDb} = require("../db/dbmiddleware");

class StrutturaEntity {

    constructor(id) {
        this.id = id;
    }

    async init() {
        await this.getNomeTipologia()
        await this.getDescrizione()
        await this.getFoto()
        await this.getCondizioniSoggiorno()
        await this.getCamere()
        await this.getLocalita()
        await this.getPrezzo()
        await this.getTasse()
        await this.getAmbienti()
        await this.getBagniCamereLetti()
        await this.getServizi()
    }

    async getNomeTipologia() {
        const db = await makeDb()

        try {
            const res = await db.query(Query.queryStruttura, [this.id])

            this.nome = res.rows[0].nomestruttura
            this.tipologia = res.rows[0].tipologiastruttura
        } catch(err) {
            console.error(err)
            if (db_flag)
                db.connRelease()
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getDescrizione() {
        const db = await makeDb()
        let qry = ''

        if (this.tipologia === "cv") {
            qry = Query.queryDescrizioneCV
        } else if (this.tipologia === "B&B") {
            qry = Query.queryDescrizioneBB
        } else {
            throw createError(500)
        }

        try {
            const res = await db.query(qry, [this.id])
            this.descrizione = res.rows[0].descrizione
        } catch(err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getFoto() {
        const db = await makeDb()

        try {
            const res = await db.query(Query.queryFoto, [this.id])
            this.foto = res.rows.map(oggetto => oggetto.percorso)
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getCondizioniSoggiorno() {
        const db = await makeDb()

        this.condizioniSoggiorno = {
            soggiorno: {
                min: null,
                max: null
            },
            checkin: {
                inizio: null,
                fine: null,
            },
            checkout: {
                inizio: null,
                fine: null
            }
        }

        this.condizioniPrenotazione = {
            anticipo: {
                min: null,
                max: null
            },
            pagamentoInLoco: null,
            pagamentoonline: null
        }

        try {
            const res = await db.query(Query.queryCondizioni, [this.id])

            this.condizioniSoggiorno.soggiorno.min = res.rows[0].minsoggiorno
            this.condizioniSoggiorno.soggiorno.max = res.rows[0].maxsoggiorno
            this.condizioniSoggiorno.checkin.inizio = res.rows[0].orainiziocheckin
            this.condizioniSoggiorno.checkin.fine = res.rows[0].orafinecheckin
            this.condizioniSoggiorno.checkout.inizio = res.rows[0].orainiziocheckout
            this.condizioniSoggiorno.checkout.fine = res.rows[0].orafinecheckout
            this.condizioniPrenotazione.anticipo.min = res.rows[0].anticipoprenotazionemin
            this.condizioniPrenotazione.anticipo.max = res.rows[0].anticipoprenotazionemax
            this.condizioniPrenotazione.pagamentoInLoco = res.rows[0].pagamentoloco
            this.condizioniPrenotazione.pagamentoonline = res.rows[0].pagamentoonline
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getCamere() {
        if (this.tipologia === "cv") return

        const db = await makeDb()

        try {
            const res = await db.query(Query.queryCamereBB, [this.id])
            this.camere = res.rows
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getLocalita() {
        const db = await makeDb()

        this.localita = {
            indirizzo: null,
            comune: null,
            provincia: null,
            regione: null
        }

        try {
            const res = await db.query(Query.queryLocalita, [this.id])
            this.localita.indirizzo = `via ${res.rows[0].via}, ${res.rows[0].numerocivico}`
            this.localita.comune = res.rows[0].comune
            this.localita.provincia = res.rows[0].provincia
            this.localita.regione = res.rows[0].regione
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getPrezzo() {
        if (this.tipologia === "B&B") return

        const db = await makeDb()

        try {
            const res = await db.query(Query.queryPrezzoCV, [this.id])
            this.prezzo = res.rows[0].prezzonotte;
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getTasse() {
        const db = await makeDb()
        try {
            const res = await db.query(Query.queryTasse, [this.id])
            this.tasse = res.rows[0]
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getAmbienti() {
        if (this.tipologia === "B&B") return

        const db = await makeDb()

        try {
            const res = await db.query(Query.queryAmbientiCV, [this.id])

            this.ambienti = Object.keys(res.rows[0])
                .reduce(function(r_res, ambiente) {
                    if (res.rows[0][ambiente]) {
                        r_res.push(ambiente);
                    }

                    return r_res;
                }, [])
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getBagniCamereLetti() {
        if (this.tipologia === "B&B") return

        const db = await makeDb()

        this.altro = {
            camere: null,
            bagni: null,
            singoli: null,
            matrimoniali: null
        }


        try {
            const res = await db.query(Query.queryBagniCamereLettiCV, [this.id])
            this.altro = res.rows[0]
        } catch(err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    async getServizi() {
        const db = await makeDb()
        let qry = ""

        if (this.tipologia === "cv") {
            qry = Query.queryServiziCV
        } else if (this.tipologia === "B&B") {
            qry = Query.queryServiziBB
        } else {
            throw createError(500)
        }

        try {
            const res = await db.query(qry, [this.id])

            this.servizi = Object.keys(res.rows[0])
                .reduce(function(r_res, servizio) {
                    if (res.rows[0][servizio]) {
                        r_res.push(servizio)
                    }

                    return r_res
                }, [])
        } catch (err) {
            console.error(err)
            throw createError(500) // Internal Server Error
        } finally {
            db.connRelease()
        }
    }

    soddisfaAmbienti(ambienti) {
        if (this.tipologia !== "cv")
            return false

        for (let ambiente of ambienti) {
            if (this.ambienti.indexOf(ambiente) === -1)
                return false
        }

        return true
    }

    soddisfaServizi(servizi) {
        for (let servizio of servizi) {
            if (this.servizi.indexOf(servizio) === -1)
                return false
        }

        return true
    }

    soddisfaPrezzo(prezzo) {
        if (this.tipologia === "cv") {
            return ((!prezzo.min || this.prezzo >= prezzo.min) && (!prezzo.max || this.prezzo <= prezzo.max))
        }

        else if (this.tipologia === "B&B") {
            for (let camera of this.camere) {

                if ((!prezzo.min || camera.prezzo >= prezzo.min) && (!prezzo.max || camera.prezzo <= prezzo.max))
                    return true
            }
            return false
        }

        else return false
    }

    utilizzaMetodi(pagamento) {

        if (pagamento.online)
            return this.condizioniPrenotazione.pagamentoonline;
        else if (pagamento.inLoco)
            return this.condizioniPrenotazione.pagamentoInLoco;
        else return true;
    }

}

module.exports = StrutturaEntity;