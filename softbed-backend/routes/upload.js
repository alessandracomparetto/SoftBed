/*const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload());

/!* La rotta /upload è vietata per le richieste get*!/
router.get('/', function(req, res, next) {
    next(createError(403));
});

//Mando qui le richieste di upload
router.post('/', function (req, res) {
    console.log(req.files)
    var file_;
    if(!req.files){
        console.log("backend dopo if")
        res.send("file not found");
        return
    }
    file_ = req.files.file;
    res.send("file up");
});*/

/*router.post('/upload', (req, res) => {
  if(req.files === null){
    return res.status(400).json({msg: 'No file uploaded'})
    //in questo caso creo una risposta BAD REQUEST e mando un messaggio
  }
  const file = req.files.file;
  const uploadPath = path.resolve(__dirname, '../../softend-frontend/public/uploads')
  file.mv(uploadPath+`/${file.name}`, err =>{
    if(err){
      //stampa se si verifica qualche errore
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
  });
});*/

/*router.post('/upload', (req, res) => {
  console.log(req.files);
  const file = req.files[0];
   res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
  /!*if(!req.files){
    console.log("Uffity");
    return res.send("IO SONO DUCI");
    /!*return res.status(400).json({msg: 'No file uploaded'})*!/
    //in questo caso creo una risposta BAD REQUEST e mando un messaggio
  }
  const file = req.files.file;

  //in frontend formData.append('file')
  //const uploadPath = path.resolve(__dirname, '../../softend-frontend/public/uploads')
  console.log("banane");
  file.mv(`/${file.name}`, err =>{
    if(err){
      //stampa se si verifica qualche errore
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
  });*!/
});*/

/*
const http = require('http');
const express = require('express');
const    Busboy = require('busboy');
const    path = require('path');
const fs = require('fs');

var router = express.Router();

router.post('/', function (req, res) {
    res.send("ciao");
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log("ciao 2");
        var saveTo = path.join(__dirname, 'uploads/' + filename);
        file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
    });

    return req.pipe(busboy);
});

module.exports = router;
*/

