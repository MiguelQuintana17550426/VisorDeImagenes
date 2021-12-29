var numeroDePag = 5;
const ruta = './imagen?imagen=imagen';
const formato=".png"
var imagen = document.getElementById("imagen1");
var imagen2 = document.getElementById("imagen2");
var imagenes = document.getElementById("imagenes");
const clasesDeImagenes = ['imagen', 'imagen1', 'imagenAncho'];
var actual = 1;
var paginaActual = 1;

document.addEventListener('keyup', teclado);

function teclado(e) {
    switch (e.code) {
        case 'ArrowRight':
            pasarhoja();
            break;
        case 'ArrowLeft':
            anteriorhoja();
            break;
        default:
            break;
    }
}

function escalaOriginal() {
    cambiar(0);
}
function ajustarAlto() {
    cambiar(1);
}

function ajustarAncho() {
    cambiar(2);
}

function cambiar(cambiaPor) {
    eval("imagen.className=imagen.className.replace(/(?:^|\s)" + clasesDeImagenes[actual] + "(?!\S)/g, clasesDeImagenes[cambiaPor]);");
    eval("imagen2.className=imagen2.className.replace(/(?:^|\s)" + clasesDeImagenes[actual] + "(?!\S)/g, clasesDeImagenes[cambiaPor]);");
    eval("imagenes.className=imagenes.className.replace(/(?:^|\s)" + clasesDeImagenes[actual] + "(?!\S)/g, clasesDeImagenes[cambiaPor]);");
    actual = cambiaPor;
}

function pasarhoja() {
    if (paginaActual + 2 > numeroDePag) return;//finaliza si es true
    paginaActual += 2;
    imagen.src = ruta + paginaActual+formato;
    if (paginaActual + 1 <= numeroDePag) {
        imagen2.style = "";
        imagen2.src = ruta + (paginaActual + 1)+formato;
    }
    else {
        imagen2.style = "display:none";
    }
}

function anteriorhoja() {
    if (paginaActual - 2 <=0) return;//finaliza si es true
    paginaActual -= 2;
    imagen.src = ruta + paginaActual+formato;
    if (paginaActual + 1 <=numeroDePag) {
        imagen2.style = "";
        imagen2.src = ruta + (paginaActual + 1)+formato;
    }
    else {
        imagen2.style = "display:none";
    }
}


function alcargar() {
    imagen.src = ruta + paginaActual + formato;
    if (numeroDePag >1) {
        imagen2.src = ruta + (paginaActual + 1) + formato;
    }
    imagen.style = "";
    imagen2.style = "";
}