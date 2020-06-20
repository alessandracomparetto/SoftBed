const express = require('express');
const fileUpload = require('express-fileupload');

const router = express.Router();

router.use(fileUpload());

/* La rotta /users è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

// Upload Endpoint
router.post('/', (req, res) => {
    if (req.files === null) {
        console.log("no get1");
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;


    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});
module.exports = router;


