const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
let utenteModel = require('../models/Utente');
var cookieParser = require('cookie-parser');
const router = express.Router();
let Token = require('../models/Token');

router.use(cookieParser());

token = new Token();

router.use(bodyParser.urlencoded({
    extended: true //per accedere a req.body
}));
router.use(bodyParser.json());

//setto le opzioni per il middleware
const config_session={
    name : "sid", //session id cookie, lo uso per leggere dalla richiesta
        resave : false, //non risalvo nello store richieste non modificate
    saveUninitialized : false, //non mi interessa salvare sessioni non inizializzate (nuova ma non modificata durante la richiesta) nello store
    secret : "s0f7_B3D", //chiave simmetrica per proteggere il cookie
    cookie : {
    //per default è HttpOnly, non accessibile da client
    maxAge : 1000 * 60 * 60 * 2,  //in millisecondi, 2 ore
        sameSite : true, //accettiamo solo cookie che arrivano dallo stesso dominio
        secure : false
    }};

router.use(session(config_session));


/* Registrazione Utente */
router.post('/utenteRegistrato', function (req, res) {
    utenteModel.inserisci(req.body,function(data){
        if(data === 400){
            res.status(data);
            res.send();
        }
        else{
            let cookie = req.sessionID; //prendo un id univoco per il cookie
            res.cookie('sid', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }); //setto il cookie negli headers della risposta
            token.aggiungiSessione(data.idutente, req.sessionID); //salvo il cookie in memoria
            res.send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Login Utente */
router.post('/login', function (req, res) {
    utenteModel.login(req.body, function(data) {
        if (data === 404) {
            res.sendStatus(404);
        } else if (data === 400) {
            res.sendStatus(400);
        } else {
            let cookie = req.sessionID;
            res.cookie('sid', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true });
            token.aggiungiSessione(data.idutente, req.sessionID);
            res.send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);
    })
});

//recupero delle informazioni dell'utente
router.post('/fetch', function(req, res) {
    const sessionId = (req.headers.cookie).split("=")[1];

    if (token.verificaToken(req.body.idutente, sessionId)) {
        utenteModel.fetch(req.body, function (data) {
            res.send(data);
        }).catch((err) => {
            console.error(err)
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});

//modifica dati personali dell'utente
router.post('/modificaDatiAggiuntivi', function (req, res) {
    utenteModel.modificaDatiAggiuntivi(req.body,function() {
        res.send()
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500)
    })
});

//recupero dati pagamento
router.post('/listaPagamenti', function (req, res) {
    const sessionId = (req.headers.cookie).split("=")[1];

    if (token.verificaToken(req.body.idutente, sessionId)) {
        utenteModel.getDatiPagamento(req.body, function (data) {
            res.send(data);
        }).catch((err) => {
            console.error(err)
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
});

//aggiungi dato pagamento
router.post('/aggiungiDatoPagamento', function (req, res) {
    utenteModel.aggiungiDatoPagamento(req.body,function() {
        res.send();
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500);
    })
});

//elimina dato pagamento
router.post('/eliminaDatoPagamento', function (req, res) {
    utenteModel.eliminaDatoPagamento(req.body,function(data){
        res.send(data);
    }).catch((err)=>{
        res.sendStatus(500);})
});

router.post('/logout', (req,res) => {
    const sessionId = (req.headers.cookie).split("=")[1]

    token.distruggiToken(req.body.idutente, sessionId)
    res.clearCookie(req.session.name)
    res.send()
});

module.exports = {
    router: router,
    token: token
};



