
const Sequelize = require("sequelize");
const UtenteModel = require('../models/Utente');
const StrutturaModel = require ('../models/Struttura');

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
const Struttura = StrutturaModel(sequelize, Sequelize);

/*TODO riferimenti delle chiavi esterne */

sequelize.sync(/*{ force: true }*/)
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    Utente,
    Struttura
}