const express = require('express');
var multer = require('multer')

const router = express.Router();

var storage = destinazione => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/${destinazione}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});

var uploadDocumenti = multer({ storage: storage('uploads/documenti') }).array('file');
var uploadFoto = multer({ storage: storage('uploads/foto') }).array('file');
router.post('/documenti',function(req, res) {
    uploadDocumenti(req, res, err => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(req.file);
    });
});

router.post('/foto',function(req, res) {
    uploadFoto(req, res, err => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(req.file);
    });
});

module.exports = router;