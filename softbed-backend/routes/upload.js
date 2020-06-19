// const express = require('express');
// const fileUpload = require('express-fileupload');
// const app = require('../app');
//
// //Mando qui le richieste di upload
// app.post('/upload', (req, res) => {
//     if(req.files === null){
//         return res.status(400).json({msg: 'No file uploaded'})
//         //in questo caso creo una risposta BAD REQUEST e mando un messaggio
//     }
//     const file = req.files.file;
//     const uploadPath = path.resolve(__dirname, '../../softend-frontend/public/uploads')
//     file.mv(uploadPath+`/${file.name}`, err =>{
//         if(err){
//             //stampa se si verifica qualche errore
//             console.log(err);
//             return res.status(500).send(err);
//         }
//         res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
//     });
// });
