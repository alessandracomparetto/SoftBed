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
        codiceFiscale: type.STRING,
        dataNascita: type.DATEONLY,
        refComuneResidenza: type.INTEGER,
        refComuneNascita: type.INTEGER,
        telefono: type.STRING,
        gestore: type.INTEGER,
    })
}
