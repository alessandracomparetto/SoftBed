const Sequelize = require('sequelize');

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
autenticazione.sync(/* { force: true } <- this drop table if exists */).then(() => {
    return autenticazione.create({
        refUtente: 1,
        email: "sonoletre@etrentatre",
        password: "buongiorno"
    })
})