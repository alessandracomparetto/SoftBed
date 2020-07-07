let express = require('express');
let router = express.Router();

let cacheRicerche = []; // [ chiave: stringa, valore: ListaStrutture ]
let StrutturaModel = require('../models/Struttura');

function getParametri(req) {
    let risultato = {};

    // I valori della chiave sono obbligatori
    risultato.chiave = {
        destinazione: req.query.destinazione,
        arrivo: req.query.arrivo,
        partenza: req.query.partenza,
        ospiti: req.query.ospiti,
        bedAndBreakfast: req.query.bedAndBreakfast,
        casaVacanze: req.query.casaVacanze
    };

    const listaServizi = [
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

    const listaAmbienti = [
        "giardino",
        "piscina",
        "salotto",
        "terrazza",
    ];

    risultato.prezzo = {};

    if (req.query["prezzoMinimo"])
        risultato.prezzo.min = parseInt(req.query["prezzoMinimo"]);

    if (req.query["prezzoMassimo"]) {
        const x = parseInt(req.query["prezzoMassimo"]);
        risultato.prezzo.max = (x < 500) ? x : undefined;
    }

    risultato.servizi = listaServizi.reduce(function(res, servizio) {
        if (req.query[servizio])
            res.push(servizio);

        return res;
    }, []);

    risultato.ambienti = listaAmbienti.reduce(function(res, ambiente) {
        if (req.query[ambiente])
            res.push(ambiente);

        return res;
    }, []);

    return risultato;
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

        // Filtro i risultati
        if ( parametro.servizi[0] || parametro.ambienti[0] || parametro.prezzo.min || parametro.prezzo.max) {
            const risultatoFiltrato = risultato.filtra(parametro.servizi, parametro.ambienti, parametro.prezzo);
            res.send(risultatoFiltrato);
        } else {
            res.send(risultato.lista);
        }

        // Aggiunta in cache e controllo che ci siano meno di 100 ricerche in cache
        const numero = cacheRicerche.unshift({chiave: JSON.stringify(parametro.chiave), valore: risultato});

        if (numero > 100)
            cacheRicerche.slice(Math.max(0, numero - 100), numero);
    }

    // Altrimenti
    else {
        console.log("Cache MISS!");
        StrutturaModel.cerca(parametro.chiave, function(data) {
            risultato = data;

            // Filtro i servizi
            if ( parametro.servizi[0] || parametro.ambienti[0] || parametro.prezzo.min || parametro.prezzo.max) {
                const risultatoFiltrato = risultato.filtra(parametro.servizi, parametro.ambienti, parametro.prezzo);
                res.send(risultatoFiltrato);
            } else {
                res.send(risultato.lista);
            }

            // Aggiunta in cache e controllo che ci siano meno di 100 ricerche in cache
            const numero = cacheRicerche.unshift({chiave: JSON.stringify(parametro.chiave), valore: risultato});

            if (numero > 100)
                cacheRicerche.slice(Math.max(0, numero - 100), numero);

        }).catch((err) => res.sendStatus(500))
    }
});

module.exports = router;
