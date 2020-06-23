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

const upload = destinazione => multer({storage: storage(`uploads/${destinazione}`)}).array('file');

const post = destinazione => router.post(`/${destinazione}`, (req, res) => {
    upload(destinazione, req, res, err => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(req.file);
    });
})

post('documenti');
post('foto');

module.exports = router;