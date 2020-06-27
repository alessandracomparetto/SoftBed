/*Model della struttura*/
// const { config } = require('../db/config');
// const { makeDb, withTransaction } = require('../db/dbmiddleware');
// const db = makeDb(config);
var db = require('../db/dbmiddleware');

module.exports={

    create:async function(datiStruttura, callback){
        console.log("qui ci sono");
        let sqlIndirizzo = ('INSERT INTO `indirizzo` (via, numeroCivico, cap, refComune) VALUES (?,?,?,?)');
        let datiQuery = [datiStruttura.address, parseInt(datiStruttura.addressnum), datiStruttura.cap, datiStruttura.town]
         db.query(sqlIndirizzo, datiQuery, function (err) {
            if (err) throw err;
         });
            console.log("query indirizzo fatta");
            // let refIndirizzo = data.idIndirizzo;
            // console.log(refIndirizzo);
            let giorno = new Date().toLocaleDateString();
            let sqlStruttura = ('INSERT INTO `struttura` (nomestruttura, tipologiastruttura, refgestore, refindirizzo, rendicontoeffettuato) VALUES (?,?,?,?,?)');
             datiQuery =[datiStruttura.name, datiStruttura.tipologia, 3, 13, giorno];
            console.log(sqlStruttura);
            db.query(sqlStruttura, datiQuery, function (err, data){
                if (err) throw err
                return callback(data);
            })
    }







/*
        ,
    fetchCrud:function(callback){
        var sql='SELECT * FROM crud';
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            return callback(data);
        });
    },
    editCrud:function(editId, callback){

        var sql=`SELECT * FROM crud WHERE id=${editId}`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },
    UpdateCrud:function(updateData,updateId,callback){

        var sql = `UPDATE crud SET ? WHERE id= ?`;
        db.query(sql, [updateData, updateId], function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
    deleteCrud:function(deleteId,callback){
        var sql = 'DELETE FROM crud WHERE id = ?';
        db.query(sql, [deleteId], function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    }*/
};
