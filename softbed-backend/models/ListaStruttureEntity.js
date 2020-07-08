const createError = require('http-errors');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const { config } = require('../db/config');
const Query = require("./QueryRicerca");
const Struttura = require("./StrutturaEntity");

class ListaStruttureEntity {

    constructor(destinazione, arrivo, partenza, ospiti, bb, cv) {
        this.datiRicerca = {
            destinazione: destinazione,
            arrivo: arrivo,
            partenza: partenza,
            ospiti: ospiti,
            bb: bb,
            cv: cv
        }

        this.lista = [];
    }

    async init() {
        await this.getID();
    }

    async getID() {

        const db = await makeDb(config);

        try {
            await withTransaction(db, async () => {
                let risultato;

                if (this.datiRicerca.bb !== "true") {
                    risultato = await db.query(Query.queryID_CV(this.datiRicerca.destinazione, this.datiRicerca.arrivo, this.datiRicerca.partenza, this.datiRicerca.ospiti), []).catch((err) => {throw err});
                } else if (this.datiRicerca.cv !== "true") {
                    risultato = await db.query(Query.queryID_BB(this.datiRicerca.destinazione, this.datiRicerca.arrivo, this.datiRicerca.partenza, this.datiRicerca.ospiti), []).catch((err) => {throw err});
                } else {
                    risultato = await db.query(Query.queryID_BB_CV(this.datiRicerca.destinazione, this.datiRicerca.arrivo, this.datiRicerca.partenza, this.datiRicerca.ospiti), []).catch((err) => {throw err});
                }

                for (let i = 0; i < risultato.length; i++) {
                    let id = risultato[i].id;
                    let strutturaTMP = new Struttura(id);
                    await strutturaTMP.init();
                    this.lista.push(strutturaTMP);
                }

            })
        } catch (err) {
            console.log(err);
            throw createError(500);
        }
    }

    filtra(servizi, ambienti, prezzo, pagamento) {
        let listaFiltrata;

        listaFiltrata = this.lista.reduce(function(res, struttura) {

            if (
                (!servizi[0] || struttura.soddisfaServizi(servizi)) &&
                (!ambienti[0] || struttura.soddisfaAmbienti(ambienti)) &&
                (!(prezzo.min || prezzo.max) || struttura.soddisfaPrezzo(prezzo)) &&
                (!(pagamento.inLoco ^ pagamento.online) || struttura.utilizzaMetodi(pagamento))
            ) {
                res.push(struttura);
            }

            return res;
        }, []);

        return listaFiltrata;
    }

}

module.exports = ListaStruttureEntity;
