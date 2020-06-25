import Sequelize from "sequelize";

const Model = Sequelize.Model;

class Prenotazione extends Model {}

Prenotazione.init({
    id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    checkIn: {
        type: sequelize.DATE,
        allowNull: false
    },
    checkOut: {
        type: sequelize.DATE,
        allowNull: false
    },
    prezzo: {
        type: sequelize.DECIMAL(7, 2),
        allowNull: false
    },
    nAdulti: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    nBambini: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    nEsenti: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    metodoPagamento: {
        type: sequelize.Model,
        allowNull: false
    },
    utente: {
        type: sequelize.Model,
        allowNull: false
    },
    struttura: {
        type: sequelize.Model,
        allowNull: false
    },
    confermata: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    dichiarazioneOspiti: {
        type: sequelize.Model,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'prenotazione'
});