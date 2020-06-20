var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SoftBed | La comodità a portata di click' });
});

/* GET login page. */
router.get('/accedi', function(req, res, next) {
  res.render('login', { title: 'Accedi' });
});

/* GET registration page. */
router.get('/registrati', function(req, res, next) {
  res.render('registration', { title: 'Registrazione' });
});

/* GET pagina di ricerca */
router.get('/search', function(req, res, next) {
  res.send(req.query);
})

router.post('/upload', (req, res) => {
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
});

module.exports = router;