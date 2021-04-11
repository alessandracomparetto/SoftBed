const { Pool } = require('pg')
const { config } = require("./config")
const util = require('util') // Il modulo util serve per generare Promise da funzioni che non generano Promise

const pool = new Pool(config)

exports.makeDb = async function() {
    // Versione asincrona di pool.connect()
    let getClient = () => {
        return new Promise((resolve, reject) => {
            pool.connect((err, connection) => {
                if (err) {
                    return reject(err)
                }

                resolve(connection)
            })
        })
    }

    const client = await getClient()

    return {
        query(query, args) {
            return util.promisify(client.query)
                .call(client, query, args)
        },
        connRelease() {
            return util.promisify(client.release)
                .call(client)
        },
        beginTransaction() {
            return util.promisify(client.query)
                .call(client, 'BEGIN')
        },
        commit() {
            return util.promisify(client.query)
                .call(client, 'COMMIT')
        },
        rollback() {
            return util.promisify(client.query)
                .call(client, 'ROLLBACK')
        }
    };
}

// Funzione asincrona di gestione di una transazione generica
// callback conterrà le effettive operazioni CRUD da eseguire
exports.withTransaction = async function(db, callback) {
    try {
        await db.beginTransaction();
        await callback();
        await db.commit();
    } catch (err) {
        await db.rollback(); // TODO >>> Rollback non funzionante
        throw err;
    } finally {
        db.connRelease();
    }
}