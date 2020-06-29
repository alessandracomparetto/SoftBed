let createError = require('http-errors');
let express = require('express');
let router = express.Router();
/* const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');*/
let ospiteModel = require('../models/Ospite')

/* La rotta / è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});


router.post('/inserimento', function (req, res) {
    console.log("REQ.BODY ====")
    console.log(req.body);
    ospiteModel.create(req.body,function(data){
        console.log(data);
        res.send(data);
    });
});

router.post('/cancellazione', function (req, res) {
    console.log("REQ.BODY ====")
    console.log(req.body);
    ospiteModel.delete(req.body,function(data){
        console.log(data);
        res.send(data);
    });
});


module.exports = router;



