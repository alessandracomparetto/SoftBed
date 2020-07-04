let express = require('express');
let router = express.Router();

let cacheRicerche = []; // [ chiave: stringa, valore: ListaStrutture ]
let StrutturaModel = require('../models/Struttura');

function getParametri(req) {
    // I valori della chiave sono obbligatori
    const chiave = {
        destinazione: req.query.destinazione,
        arrivo: req.query.arrivo,
        partenza: req.query.partenza,
        ospiti: req.query.ospiti,
        bedAndBreakfast: req.query.bedAndBreakfast,
        casaVacanze: req.query.casaVacanze
    }

    const listaFiltri = [
        "animaliAmmessi",
        "ariaCondizionata",
        "bambini",
        "cucinaCeliaci",
        "festeAmmesse",
        "navettaAeroportuale",
        "parcheggio",
        "riscaldamento",
        "servizioInCamera",
        "strutturaDisabili",
        "permessoFumare",
        "TV",
        "wifi",
    ];

    const filtri = listaFiltri.reduce(function(res, filtro) {
        if (req.query[filtro])
            res.push(filtro);

        return res;
    }, [])

    return {chiave: chiave, filtri: filtri};
}

router.get('/', function(req, res) {

    const parametro = getParametri(req);
    const pos = cacheRicerche.map((ricerca) => { return ricerca.chiave; }).indexOf(JSON.stringify(parametro.chiave));
    let risultato;

    // Se trovo la ricerca nella cache
    if (pos !== -1) {
        console.log("Cache HIT!");
        risultato = cacheRicerche[pos].valore;
        cacheRicerche.splice(pos, 1);

        // Applico i filtri
        if (parametro.filtri[0]) {
            risultato = risultato.applicaFiltri(parametro.filtri);
            res.send(risultato)
        } else {
            res.send(risultato.lista);
        }
    }

    // Altrimenti
    else {
        console.log("Cache MISS!");
        StrutturaModel.cerca(parametro.chiave, function(data) {
            risultato = data;

            if (parametro.filtri && parametro.filtri[0]) {
                risultato = risultato.applicaFiltri(parametro.filtri);
                res.send(risultato);
            } else {
                res.send(risultato.lista);
            }

            // Aggiunta in cache e controllo che ci siano meno di 100 ricerche in cache
            const numero = cacheRicerche.unshift({chiave: JSON.stringify(parametro.chiave), valore: risultato});

            if (numero > 100)
                cacheRicerche.slice(Math.max(0, numero - 100), numero);

        }).catch((err) => res.status(err).send());
    }
})

module.exports = router;