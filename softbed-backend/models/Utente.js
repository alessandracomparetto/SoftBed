const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('utente', {
        idUtente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cognome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        codiceFiscale: Sequelize.STRING,
        dataNacita: Sequelize.DATE,
        reComuneResidenza: Sequelize.INTEGER,
        reComuneNascita: Sequelize.INTEGER,
        telefono: Sequelize.STRING,
        gestore: Sequelize.INTEGER,
    })
}



/*

// è messa qui perché avevo difficioltà ad importarla
const conf = ['softbed', 'softAdmin', 'softEngineers', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0
    },
    define: {
        freezeTableName: true
    }
}];

const sequelize = new Sequelize(...conf);

var autenticazione = sequelize.define('autenticazione', {
    idAutenticazione: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    refUtente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Elimina la tabella se esiste, la crea se non esiste, inserisce

function autenticati ( email, password) {
    autenticazione.sync(/!* { force: true } <- this drop table if exists *!/).then(() => {
        return autenticazione.create({
            //refUtente: refUtente,
            email: email,
            password: password
        })
    })
}

export default autenticazione
*/

