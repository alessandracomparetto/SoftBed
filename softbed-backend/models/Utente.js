const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');


//questo model utente deve contenere tutti i riferimenti necessari
//se è un gestore deve are la lista dei riferimenti alle strutture
//se è un ospite deve avere la lista dei riferimenti alle prenotazioni
//TODO i model devono essere due, uno per gestore e uno per ospite
class Utente extends Model {}

Utente.init({
    idUtente : Number,
    gestore : Boolean,
    idSessione : String,
    refStruttura : Number,
})