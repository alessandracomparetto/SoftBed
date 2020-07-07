let express = require('express');
let router = express.Router();

let cacheRicerche = {}; // { stringa: valore }

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

    risultato.pagamento = {}

    risultato.pagamento.inLoco = !!req.query["pagamentoInLoco"];
    risultato.pagamento.online = !!req.query["pagamentoOnline"];

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

function inserisciCache(chiave, valore) {
    cacheRicerche[chiave] = valore;

    setTimeout(() => {
        delete cacheRicerche[chiave];
    }, 180000); // 3 minuti
}

router.get('/', function(req, res) {

    const parametro = getParametri(req);
    const strChiave = JSON.stringify(parametro.chiave);
    let risultato;

    // Se trovo la ricerca nella cache
    if (cacheRicerche[strChiave]) {
        risultato = cacheRicerche[strChiave]
        console.log("Cache HIT!");

        // Filtro i risultati
        if (parametro.servizi[0] || parametro.ambienti[0] ||
            parametro.prezzo.min || parametro.prezzo.max ||
            parametro.pagamento.online || parametro.pagamento.inLoco
        ) {
            const risultatoFiltrato = risultato.filtra(parametro.servizi, parametro.ambienti, parametro.prezzo, parametro.pagamento);
            res.send(risultatoFiltrato);
        } else {
            res.send(risultato.lista);
        }
    }

    // Altrimenti
    else {
        console.log("Cache MISS!");
        StrutturaModel.cerca(parametro.chiave, function(data) {
            risultato = data;

            // Filtro i servizi
            if (parametro.servizi[0] || parametro.ambienti[0] ||
                parametro.prezzo.min || parametro.prezzo.max ||
                parametro.pagamento.online || parametro.pagamento.inLoco
            ) {
                const risultatoFiltrato = risultato.filtra(parametro.servizi, parametro.ambienti, parametro.prezzo, parametro.pagamento);
                res.send(risultatoFiltrato);
            } else {
                res.send(risultato.lista);
            }

            // Aggiunta in cache
            inserisciCache(strChiave, risultato);

        }).catch((err) => res.sendStatus(err.status));
    }
})

module.exports = router;
