let express = require('express');
let router = express.Router();

// Cache
let cacheManager = require('cache-manager');
let cacheStrutture = cacheManager.caching({store: 'memory', max: 100, ttl: 300}) // 5 minuti

// Model
let strutturaModel = require('../models/Struttura')

router.get('/', function(req, res, next) {
    // Controllo se la ricerca è presente in cache
    const query = JSON.stringify(req.query);

    cacheStrutture.get(query, function(err, result) {
        if (result) {
            res.send(result);
        }

        else {
            // TODO: fare query al DB

            cacheStrutture.set(query, "ciao", function(err) {
                if (err) throw err;
            })
            res.send(req.query);
        }
    });
})

module.exports = router;