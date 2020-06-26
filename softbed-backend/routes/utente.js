/*TODO: gestire gli errori del login e fare apparire messaggi diversi in base all'errore:
*  password sbagliato o email non corretta*/

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Utente } = require('../sequelize/middleware');

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

/* La rotta /users è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

/* Registrazione Utente */
router.post('/utenteRegistrato', (req, res) => {
    console.log(req.body.nome + req.body.cognome + req.body.dataNascita+ req.body.gestore)
    Utente.create(req.body)
        .then(res.send("finito"))
});

/* Login Utente */
router.post('/login', autenticazione);

/* Dato Pagamento utente
router.post('/pagamenti', aggiuntaDatoPagamento);*/

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

/*async function registrazione(req, res, next)   {
    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            // inserimento utente
            results = await db.query('INSERT INTO `utente` (nome, cognome, dataNascita, gestore) \
        SELECT ? AS nome, ? AS cognome, ? AS dataNascita, ? AS gestore',[
                req.body.nome,
                req.body.cognome,
                req.body.data_nascita,
                req.body.gestore == 'gestore' ? '1' : '0',
            ]).catch(err => {
                throw err;
            });
            console.log('Inserimento tabella utente');
            // recupero dello user id
            let id_utente = results.insertId;
            // generazione della password cifrata con SHA512
            //TODO cripta password a frontend
            results = await db.query('SELECT sha2(?,512) AS encpwd', [req.body.pass])
                .catch(err => {
                    throw err;
                });
            let encpwd = results[0].encpwd;
            console.log('Password cifrata');
            console.log(results);

            results = await db.query('INSERT INTO `autenticazione` \
            (refUtente, email, password) VALUES ?', [
                [
                    [
                        id_utente,
                        req.body.email,
                        encpwd
                    ]
                ]
            ])
                .catch(err => {
                    throw err;
                });
            console.log(`Utente ${req.body.email} inserito!`);
            req.session.session_uid = id_utente;
            console.log(req.session)
            res.send();
        });
    } catch (err) {
        console.log(err);
        next(createError(500));

    }
}*/

// middleware di autenticazione
async function autenticazione(req, res, next) {
    // istanziamo il middleware
    const db = await makeDb(config);
    let results = {};
    try {
        await withTransaction(db, async() => {
            // inserimento utente
            results = await db.query('SELECT * FROM `autenticazione`\
            WHERE email = ?', [req.body.email])
                .catch(err => {
                    throw err;
                });
            if (!results[0]) {
                console.log('Utente non trovato!');
                next(createError(404, 'Utente non trovato'));
            } else {

                if (req.body.pass != results[0].password) {
                    // password non coincidenti
                    console.log('Password errata!');
                    next(createError(403, 'Password errata'));
                } else {
                    let refUtente = results[0].refUtente;
                    //creo id della sessione
                    req.session.session_uid = refUtente;
                    console.log('Utente autenticato');
                    console.log(req.sessionID);
                    res.send();
                }
            }
        });
    } catch (err) {
        console.log(err);
        next(createError(500));
    }
}





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


