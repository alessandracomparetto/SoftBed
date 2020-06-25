module.exports = (sequelize, type) => {
    return sequelize.define('autenticazione', {
        idAutenticazione: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true,
        },
        refUtente: {
            type: type.INTEGER,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        }
    });
}