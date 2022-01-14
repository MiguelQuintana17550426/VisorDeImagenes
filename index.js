


function traducirDirectorio(directorio) {
    directorio = String(directorio);
    for (var i = directorio.length - 1; i >= 0; i--) {
        if (directorio[i] == '\\') {
            directorio[i] = '/';
        }
    }
    return directorio;
}

require('./connection');
const historieta = require('./historieta.js');
var express = require('express');

var app = express();
var port = 4005;
app.set('view engine', 'jade');
app.get('/',function (req, res) {
    var capitulos = 10;
    historieta.find({}, function (err, docs) {
        capitulos = docs;
        console.log(docs);
        res.render("index", { capitulos });
    });
});

app.get('/episodio', function (req, res) {
    var obra = req.query['obra'];
    var episodio = req.query['episodio'];
    var numeroDePag = req.query['numeroDePag'] != null ? req.query['numeroDePag'] : 0;
    var nombreBase = req.query['nombreBase'] != null ? req.query['nombreBase'] : '';
    var extension = req.query['extension'] != null ? req.query['extension'] : '';
        res.render('episodio', { obra, episodio, numeroDePag , nombreBase, extension});
});

app.get('/imagen', function (req, res) {
    var directorio = traducirDirectorio(String(__dirname));
    var s = '';
    if (req.query['obra'] != null) {
        s = "/" + req.query['obra'] + "/";
    }
    var sEpisodio = '';
    if (req.query['episodio'] != null) {
        sEpisodio = "/" + req.query['episodio'] + "/";
    }
    res.sendFile(directorio + "/imagen/" + s + sEpisodio + req.query['imagen'] );
});

app.get('/css', function (req, res) {
    var directorio = traducirDirectorio(String(__dirname));
    res.sendFile(directorio + "/css/" + req.query['css']);
});

app.get('/js', function (req, res) {
    var directorio = traducirDirectorio(String(__dirname));
    res.sendFile(directorio + "/js/" + req.query['js']);
});

app.get('/capitulos', function (req, res) {
    historieta.find({ nombre: req.query['obra'] }, "capitulos", function (err, docs) {
        var nombre = req.query['obra'];
        var capitulos = docs.length > 0 ? docs[0].toObject().capitulos : [];
        res.render('capitulos', {capitulos,nombre});
    });
    //res.render('capitulos', {});
});



app.listen(port);

