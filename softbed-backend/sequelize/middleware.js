const Sequelize = require("sequelize");

exports.sequelize = new Sequelize('softbed', 'softAdmin', 'softEngineers', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0
    },
    define: {
        freezeTableName: true
    }
});