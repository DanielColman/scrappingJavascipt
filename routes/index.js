var express = require('express');
var router = express.Router();
// (getNesw) Script encargado de realizar web scraping a la web del Diario
var getNews = require('../public/javascripts/script');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET Consulta. */
router.get('/consulta', function(req, res) {
    if (!req.query.q) {
        res.status(400).json({ "codigo": "g268", "error": "Parámetros inválidos" });
    } else {
        getNews(req.query.q)
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ "codigo": "g267", "error": `No se encuentran noticias para el texto: ${req.query.q}` })
                }
            })
            .catch(err => {
                res.status(500).json({ "codigo": "g100", "error": "Error interno del servidor" });
            });
    }
});


module.exports = router;