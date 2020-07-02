/*TODO: gestire gli errori del login e fare apparire messaggi diversi in base all'errore:
*  password sbagliato o email non corretta*/

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
//const { Utente } = require('../sequelize/middleware');
let utenteModel = require('../models/Utente');
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true //per accedere a req.body
}))
router.use(bodyParser.json())

//setto le opzioni per il middleware
router.use(session({
    name : "sid", //session id cookie, lo uso per leggere dalla richiesta
    resave : false, //non risalvo nello store richieste non modificate
    saveUninitialized : false, //non mi interessa salvare sessioni non inizializzate (nuova ma non modificata durante la richiesta) nello store
    secret : "s0f7_B3D", //chiave simmetrica per proteggere il cookie
    cookie : {
        //per default è HttpOnly, non accessibile da client
        maxAge : 1000 * 60 * 60 * 2,  //in millisecondi, 2 ore
        sameSite : true, //accettiamo solo cookie che arrivano dallo stesso dominio
        secure : false, //TODO da cambiare in true!
    }
}))


/* Registrazione Utente */
router.post('/utenteRegistrato', function (req, res) {
    utenteModel.inserisciUtente(req.body,function(data){
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});


/* Login Utente */
router.post('/login', function (req, res) {
    utenteModel.login(req.body,function(data){
        req.session.session_uid = data;
        console.log(req.sessionID);
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

//recupero delle informazioni dell'utente
router.get('/', function(req, res) {
    utenteModel.fetch(function(data){
        res.json(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

//modifica dati personali dell'utente
router.post('/modificaDatiAggiuntivi', function (req, res) {
    utenteModel.modificaDatiAggiuntivi(req.body,function(data){
        let status = (data.changedRows === 0) ? 304: 200;
        res.sendStatus( status);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

//recupero dati pagamento
router.post('/listaPagamenti', function (req, res) {
    utenteModel.getDatiPagamento(req.body,function (data){
        res.send(data);
    }).catch((err) => {
        res.status(err.status).send(err.message);
    });
});

//aggiungi dato pagamento
router.post('/aggiungiDatoPagamento', function (req, res) {
    utenteModel.aggiungiDatoPagamento(req.body,function(data){
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

//elimina dato pagamento
router.post('/eliminaDatoPagamento', function (req, res) {
    utenteModel.eliminaDatoPagamento(req.body,function(data){
        res.send(data);
    }).catch((err)=>{
        res.status(err.status).send(err.message)})
});

/*Logout  TODO: il pulsante a cui accedere, cosa mandare a frontend in caso di errore*/
/*router.post('/logout', (req,res) => {
    req.session.destroy( err =>{
        if(err){
            //non posso distruggere la sessione
            console.log("Errore durante il logout")
        }
    })
    //se tutto ok, distruggo il coockie della sessione
    res.clearCookie(req.session.name);
})*/


module.exports = router;

// recupero dello user id


//custom middleware
/*router.use((req, res, utente, next) =>{
    //prendo session_uid
    const {session_uid}  = req.session;
    if(session_uid){
        //oggetto condiviso nel middleware
        res.locals.user =
    }
})*/


