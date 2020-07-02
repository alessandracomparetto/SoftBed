let express = require('express');
let router = express.Router();

// Cache
let cacheManager = require('cache-manager');
let cacheRicerche = cacheManager.caching({store: 'memory', max: 200, ttl: 300}) // 5 minuti

// Model
let strutturaModel = require('../models/Struttura')

router.get('/', function(req, res) {
    // Controllo se la ricerca è presente in cache
    const query = JSON.stringify(req.query);

    cacheRicerche.get(query, function(err, result) {
        // Se la ricerca è salvata in cache viene inviato il risultato memorizzato
        if (result) {
            console.log("Cache hit!");
            res.send(result);
        }

        // Altrimenti viene effettuata la query al db
        else {
            strutturaModel.cerca(req.query, function(data) {
                console.log("Cache miss!");

                res.send(data);

                // Inserimento in cache
                cacheRicerche.set(query, JSON.stringify(data), function(err) {
                    if (err) throw err;
                })
            })
                .catch((err) => {
                    res.status(500).send(err);
                });
        }
    });
})

module.exports = router;