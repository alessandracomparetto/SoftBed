
const mysql = require('mysql');
const util = require('util');
config = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'softAdmin',
    password: 'softEngineers',
    database: 'softbed',
    multipleStatements: true
};
// carichiamo il modulo mysql
// e il modulo util per generare Promise
// da funzioni che non generano promise



// Creiamo una funzione "factory"
// questo design pattern è pensayto per
// creare oggetti già istanziati con tutte le loro proprietà
// makeDb creerà un database che svolge tutte le transazioni
// in modo asincrono
console.log("CREO IL DB");
exports.makeDb = async function(config) {
    // creiamo il pool di connessione
    // per gestire efficientemente le richieste concorrenti
    // per una singola connessione si può usare createConnection
    let pool = mysql.createPool(config);

    // Creiamo la versione asincrona di pool.getConnection
    let getConnection = () => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    return reject(err);
                }
                resolve(connection);
            });
        });
    };

    // otteniamo la connessione che useremo
    // nelle versioni asincrone dei metodi
    // del nostro middleware
    const connection = await getConnection();

    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        connRelease() {
            return util.promisify(connection.release)
                .call(connection);
        },
        beginTransaction() {
            return util.promisify(connection.beginTransaction)
                .call(connection);
        },
        commit() {
            return util.promisify(connection.commit)
                .call(connection);
        },
        rollback() {
            return util.promisify(connection.rollback)
                .call(connection);
        },
        end() {
            return pool.end.call(pool);
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
        await db.rollback();
        throw err;
    } finally {
        db.end();
    }
}