const Sequelize = require('sequelize')
const { Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Struttura extends Model {
        // tipologia="";

        setTipologia (value) {
            this.tipologia = value;
            console.log("ok tutto ok");
        }

    }

    Struttura.init({
        idStruttura: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeStruttura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refGestore: {
            type: DataTypes.INTEGER,
            //allowNull: false
        },
        refIndirizzo: {
            type: DataTypes.INTEGER,
            //allowNull: false
        },
        rendicontoEffettuato: {
            type: DataTypes.DATEONLY,
            defaultValue: null,
        },
        /*tipologia: {
            type: DataTypes.STRING,
            set (value){
                this.setDataValue('tipologia', value);
                console.log("???");
                return;
            }
        },*/
    }, {sequelize});
    return Struttura;
}

/*
const Sequelize = require('sequelize');

let tipologia ="";


module.exports = (sequelize, type) => {
    return sequelize.define('struttura', {
        idStruttura: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeStruttura: {
            type: type.STRING,
            allowNull: false
        },
        refGestore: {
            type: type.INTEGER,
            /!*allowNull: false*!/
        },
        refIndirizzo: {
            type: type.INTEGER,
            /!*allowNull: false*!/
        },
        rendicontoEffettuato: {
            type: type.DATEONLY,
            defaultValue: null,
        },
        tipologia: {
            type: type.VIRTUAL,
            get() {
                return `${this.tipologia}`;
            },
            set(value) {
                this.setDataValue('tipologia', value);
                console.log("okok")
            }
        },
    });
}
*/
