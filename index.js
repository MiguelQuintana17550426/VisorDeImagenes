/*var express = require('express');
var app = express();
app.use(express.static(__dirname + '/')); //__dir and not _dir
//var port = process.env.PORT;
var port = 4005;
app.get('/',(req,res)=>res.send("funciona"));
app.listen(port);
console.log('server on ' + port);*/
function traducirDirectorio(directorio) {
   // console.log(String(directorio));
    directorio = String(directorio);
    for (var i = directorio.length - 1; i >= 0; i--) {

        if (directorio[i] == '\\') {
            directorio[i] = '/';
            //directorio=directorio.replace("\\",'/');
        }
    }
    return directorio;
}

var express = require('express');

var app = express();
var port = 4005;
app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.render("index", {});
});

app.get('/imagen', function (req, res) {
    var directorio = traducirDirectorio(String(__dirname));
    res.sendFile(directorio + "/imagen/" + req.query['imagen']);
});

app.get('/css', function (req, res) {
    var directorio = traducirDirectorio(String(__dirname));
    res.sendFile(directorio + "/css/" + req.query['css']);
});

app.get('/js', function (req, res) {
    var directorio = traducirDirectorio(String(__dirname));
    res.sendFile(directorio + "/js/" + req.query['js']);
});


app.listen(port);

