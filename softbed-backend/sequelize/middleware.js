const Sequelize = require("sequelize");

const UtenteModel = require('../models/Utente');
const AutenticazioneModel = require('../models/Autenticazione');
// const PrenotazioneModel = require('../models/Prenotazione');

const sequelize = new Sequelize('softbed', 'softAdmin', 'softEngineers', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

const Utente = UtenteModel(sequelize, Sequelize);
const Autenticazione = AutenticazioneModel(sequelize, Sequelize);
// const Prenotazione = PrenotazioneModel(sequelize, Sequelize);

/*TODO riferimenti delle chiavi esterne */
sequelize.sync(/*{ force: true }*/)
    .then(() => {
        console.log(`Database & tables created!`)
    })


module.exports = {
    Autenticazione,
    Utente
}