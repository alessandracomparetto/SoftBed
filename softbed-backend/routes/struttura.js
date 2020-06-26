const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Struttura } = require('../sequelize/middleware');

const router = express.Router();

router.use(bodyParser.json());

router.post('/tipologia', (req, res) => {
    console.log("qui dentro ci sono!");
    Struttura.setTipologia();
    res.send("HO FINITO");
});

module.exports = router;
