const express = require('express');
var path = require('path');
var multer = require('multer')

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});
var upload = multer({ storage: storage }).array('file');

router.post('/',function(req, res) {

    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(req.file);

    });

});

// La rotta /users è vietata
router.get('/', function(req, res, next) {
    next(createError(403));
});

module.exports = router;




