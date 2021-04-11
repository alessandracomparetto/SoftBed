const createError = require('http-errors');
const { makeDb } = require('../db/dbmiddleware');
const { config } = require('../db/config');
const Query = require("./QueryRicerca");
const Struttura = require("./StrutturaEntity");
const GIORNO = 86400000; // TODO: Potrebbe non stare qui (?)


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
        const db = await makeDb()

        try {
            let qry

            if (this.datiRicerca.bb !== "true") {
                qry = Query.queryID_CV
            } else if (this.datiRicerca.cv !== "true") {
                qry = Query.queryID_BB
            } else {
                qry = Query.queryID_BB_CV
            }

            const arrivo = this.datiRicerca.arrivo
            const partenza = this.datiRicerca.partenza
            const durataSoggiorno = Math.ceil((new Date(partenza).getTime() - new Date(arrivo).getTime()) / GIORNO);

            const res = await db.query(
                qry,
                [
                    this.datiRicerca.destinazione,
                    arrivo,
                    partenza,
                    this.datiRicerca.ospiti,
                    durataSoggiorno
                ]
            )

            for (let row of res.rows || []) {
                let id = row.id
                let strutturaTMP = new Struttura(id)
                await strutturaTMP.init()
                this.lista.push(strutturaTMP)
            }
        } catch (err) {
            console.error(err)
            throw createError(500); // Internal Server Error
        } finally {
            db.connRelease()
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
