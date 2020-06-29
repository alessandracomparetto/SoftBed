let express = require('express');
let router = express.Router();

// Cache
let cacheManager = require('cache-manager');
let cacheStrutture = cacheManager.caching({store: 'memory', max: 100, ttl: 180}) // 3 minuti

// Model
let strutturaModel = require('../models/Struttura')

router.get('/', function(req, res) {
    // Controllo se la ricerca è presente in cache
    const query = JSON.stringify(req.query);

    cacheStrutture.get(query, function(err, result) {
        if (result) {
            console.log("Cache hit!");
            res.send(result);
        }

        else {
            strutturaModel.search(req.query, function(data) {
                console.log("Cache miss!");

                // Inserimento in cache
                cacheStrutture.set(query, JSON.stringify(data), function(err) {
                    if (err) throw err;
                    else res.send(data);
                })
            }).catch(err => console.log(err));


        }
    });
})

module.exports = router;