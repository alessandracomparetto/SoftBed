const createError = require('http-errors');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const { config } = require('../db/config');
const Query = require("./QueryStruttura");

class StrutturaEntity {

    constructor(id) {
        this.id = id;
    }

    async init() {
        await this.getNomeTipologia();
        await this.getDescrizione();
        await this.getFoto();
        // await this.getCondizioniPrenotazione();
        await this.getCondizioniSoggiorno();
        await this.getCamere();
        await this.getLocalita();
        await this.getPrezzo();
        await this.getTasse();
        await this.getAmbienti();
        await this.getBagniCamereLetti();
        await this.getServizi();
    }

    async getNomeTipologia() {
        const db = await makeDb(config);
        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryStruttura(), [this.id]).catch((err) => {throw err});
                this.nome = risultato[0].nomeStruttura;
                this.tipologia = risultato[0].tipologiaStruttura;
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getDescrizione() {
        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                let risultato = [];

                if (this.tipologia === "cv") {
                    risultato = await db.query(Query.queryDescrizioneCV(), [this.id]).catch((err) => {throw err});
                } else if (this.tipologia === "B&B") {
                    risultato = await db.query(Query.queryDescrizioneBB(), [this.id]).catch((err) => {throw err});
                } else {throw createError(500)}

                this.descrizione = risultato[0].descrizione;
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getFoto() {
        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryFoto(), [this.id]).catch((err) => {throw err});
                this.foto = risultato.map((oggetto) => {return oggetto.percorso})
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getCondizioniPrenotazione() {
        const db = await makeDb(config);

        this.condizioniPrenotazione = {
            anticipo: {
                min: null,
                max: null
            }
        }
    }

    async getCondizioniSoggiorno() {
        const db = await makeDb(config);
        this.condizioniSoggiorno = {
            soggiorno: {
                min: null,
                max: null
            },
            checkIn: {
                inizio: null,
                fine: null,
            },
            checkOut: {
                inizio: null,
                fine: null
            }
        }

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryCondizioni(), [this.id]).catch((err) => {throw err});

                this.condizioniSoggiorno.soggiorno.min = risultato[0].minSoggiorno;
                this.condizioniSoggiorno.soggiorno.max = risultato[0].maxSoggiorno;
                this.condizioniSoggiorno.checkIn.inizio = risultato[0].oraInizioCheckIn;
                this.condizioniSoggiorno.checkIn.fine = risultato[0].oraFineCheckIn;
                this.condizioniSoggiorno.checkOut.inizio = risultato[0].oraInizioCheckOut;
                this.condizioniSoggiorno.checkOut.fine = risultato[0].oraFineCheckOut;
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getCamere() {
        if (this.tipologia === "cv") return;

        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryCamereBB(), [this.id]).catch((err) => {throw err});
                this.camere = risultato;
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getLocalita() {
        const db = await makeDb(config);
        this.localita = {
            indirizzo: null,
            comune: null,
            provincia: null,
            regione: null
        }
        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryLocalita(), [this.id]).catch((err) => {throw err});
                this.localita.indirizzo = `via ${risultato[0].via}, ${risultato[0].numeroCivico}`;
                this.localita.comune = risultato[0].comune;
                this.localita.provincia = risultato[0].provincia;
                this.localita.regione = risultato[0].regione;
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getPrezzo() {
        if (this.tipologia === "B&B") return;

        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryPrezzoCV(), [this.id]).catch((err) => {throw err});
                this.prezzo = risultato[0].prezzoNotte;
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getTasse() {
        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryTasse(), [this.id]).catch((err) => {throw err});
                this.tasse = risultato[0];
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getAmbienti() {
        if (this.tipologia === "B&B") return;

        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryAmbientiCV(), [this.id]).catch((err) => {throw err});
                this.ambienti = Object.keys(risultato[0])
                    .reduce(function(res, ambiente) {
                        if (risultato[0][ambiente] === 1) {
                            res.push(ambiente);
                        }

                        return res;
                    }, []);
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getBagniCamereLetti() {
        if (this.tipologia === "B&B") return;

        this.altro = {
            camere: null,
            bagni: null,
            singoli: null,
            matrimoniali: null
        }

        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                const risultato = await db.query(Query.queryBagniCamereLettiCV(), [this.id]).catch((err) => {throw err});
                this.altro = risultato[0];
            })
        } catch(err) {
            console.log(err);
            throw createError(500);
        }
    }

    async getServizi() {
        const db = await makeDb(config);
        let risultato = [];

        try {
            await withTransaction(db, async () => {
                if (this.tipologia === "cv") {
                    risultato = await db.query(Query.queryServiziCV(), [this.id]).catch((err) => {throw err});
                } else if (this.tipologia === "B&B") {
                    risultato = await db.query(Query.queryServiziBB(), [this.id]).catch((err) => {throw err});
                } else {throw createError(500)}

                this.servizi = Object.keys(risultato[0])
                    .reduce(function(res, servizio) {
                        if (risultato[0][servizio] === 1) {
                            res.push(servizio);
                        }

                        return res;
                    }, []);
            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    soddisfaFiltri(filtri) {

        for (let filtro of filtri) {
            if (this.servizi.indexOf(filtro) === -1)
                return false;
        }

        return true;
    }

}

module.exports = StrutturaEntity;