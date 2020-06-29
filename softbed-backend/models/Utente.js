/* CON SEQUELIZE
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('utente', {
        idUtente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: type.STRING,
            allowNull: false
        },
        cognome: {
            type: type.STRING,
            allowNull: false
        },
        dataNascita: type.DATEONLY,
        codiceFiscale: type.STRING,
        refIndirizzo: type.INTEGER,
        refComuneNascita: type.INTEGER,
        telefono: type.STRING,
        gestore: type.INTEGER,
    })
}
*/

var db = require('../db/dbmiddleware');

module.exports= {

    create:async function(datiUtente, callback) {
        let refUtente;
        let sql = ('INSERT INTO `utente` (nome, cognome, dataNascita, gestore) VALUES (?,?,?,?)');
        let datiQuery = [datiUtente.nome, datiUtente.cognome, datiUtente.dataNascita, datiUtente.gestore == 'gestore' ? '1' : '0'];
        db.query(sql, datiQuery, function (err, risultato1) {  //INSERIMENTO IN UTENTE
            if (err) throw err;
            refUtente = risultato1.insertId;

            let sql = ('INSERT INTO `autenticazione` (refUtente, email, password) VALUES (?,?,?)');
            let datiQuery = [refUtente, datiUtente.email, datiUtente.pass];
            db.query(sql, datiQuery, function (err, risultato3) {  //INSERIMENTO IN AUTENTICAZIONE
                if (err) throw err;
                console.log(`Utente inserito!`);
            }); //chiusura query autenticazione
        return callback("OK");
    }); //chiusura query utente

    }//end create

};