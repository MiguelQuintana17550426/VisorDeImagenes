var numeroDePag = parseInt(window.sessionStorage.numeroDePag);
var obra = window.sessionStorage.obra;
var episodio = window.sessionStorage.episodio;
var nombreBase = sessionStorage.nombreBase;
var extension = sessionStorage.extension;
var ajustandoPorAlto = false;
var ajustandoPorAncho = false;
var img = {
    elementos: [document.getElementById('imagen1'), document.getElementById('imagen2')],
    estilos: [{}, {}],
    paginas: [1,2]
};
var imagenes = {
    elemento: document.getElementById('imagenes'),
    style:[]
}


function alcargar() {
    if (window.innerHeight > 1080) {
        document.getElementById('body').style.backgroundImage = './imagen?imagen=fondo3_4k.jpg';
    } else if (window.innerWidth > 1920) {
        document.getElementById('body').style.backgroundImage = './imagen?imagen=fondo3_4k.jpg';
    }

    for (var i = img.elementos.length - 1; i >= 0; i--) {
        img.estilos[i] = {};
    }
    img.elementos[0].src = './imagen?imagen=' + nombreBase + '1' + extension +
        '&obra=' + obra +
            '&episodio='+episodio;
    if (numeroDePag > 1) {
        img.elementos[1].src = './imagen?imagen='+nombreBase+'2'+extension+'&obra=' + obra +
            '&episodio='+episodio;
    }
    aplicarEstilo(img.elementos, img.estilos);
    bodyNoPequeno();
    //aplicarEstilo(imagenes.elemento, [imagenes.style]);
}

function ajustarPorAltura() {
    if (ajustandoPorAlto) {
        img.estilos[0]['height'] = window.innerHeight + 'px';
        img.estilos[1]['height'] = window.innerHeight + 'px';
        aplicarEstilo(img.elementos, img.estilos);
        window.scroll(0, imagenes.elemento.offsetTop);
    } else {
        img.estilos[0]['height'] = '';
        img.estilos[1]['height'] = '';
        aplicarEstilo(img.elementos, img.estilos);
    }
    bodyNoPequeno();
}

function rezise() {
    ajustarPorAltura();
    ajustarPorAncho();
}

function ajustarPorAncho() {
    if (ajustandoPorAncho) {
        img.estilos[0]['width'] = window.innerWidth/2 + 'px';
        img.estilos[1]['width'] = window.innerWidth/2 + 'px';
        aplicarEstilo(img.elementos, img.estilos);
        window.scroll(0, imagenes.elemento.offsetTop);
    } else {
        img.estilos[0]['width'] = '';
        img.estilos[1]['width'] = '';
        aplicarEstilo(img.elementos, img.estilos);
    }
    bodyNoPequeno();
}

function escalaOriginal() {
    img.estilos[0]['height'] = '';
    img.estilos[1]['height'] = '';
    img.estilos[0]['width'] = '';
    img.estilos[1]['width'] = '';
    aplicarEstilo(img.elementos, img.estilos);
    bodyNoPequeno();
    ajustandoPorAlto = false;
    ajustandoPorAncho = false;
}

function aplicarEstilo(elementos, estilos) {
    for (var e = elementos.length - 1; e >= 0; e--) {
        elementos[e].style = {};
        var llaves = Object.keys(estilos[e]);
        for (var ll = llaves.length - 1; ll >= 0; ll--) {
            elementos[e].style[llaves[ll]] = estilos[e][llaves[ll]];
        }
    }
}

function bodyNoPequeno() {
    var body = document.getElementById('body');
    body.style = '';
    body.style.minHeight = window.innerHeight + "px";
    body.style.minWidth = (window.innerWidth - 10) + "px";
    return;
}

function pasarHoja() {
    console.log(img);
    if ((img.paginas[0] < numeroDePag && img.paginas[1] < numeroDePag)) {
        img.paginas[0] += 2;
        img.paginas[1] += 2;
    }
    actualizarHoja();
}

function anteriorHoja() {
    console.log(img);
    if ((img.paginas[0] > 1 && img.paginas[1] > 2)) {
        img.paginas[0] -= 2;
        img.paginas[1] -= 2;
    }
    actualizarHoja();
}

function actualizarHoja() {
    for (var i = img.elementos.length - 1; i >= 0; i--) {
        if (img.paginas[i] <= numeroDePag && img.paginas[i]>0) {
            //img.elementos[i].src = './imagen?imagen=imagen' + img.paginas[i] + '.png';
            img.elementos[i].src = './imagen?imagen=' + nombreBase + img.paginas[i] + extension +
        '&obra=' + obra +
            '&episodio='+episodio;

            img.estilos[i]['display'] = '';
        } else {
            img.estilos[i]['display'] = 'none';
        }
    }
    aplicarEstilo(img.elementos, img.estilos);
}

function pulsar(e) {
    switch (e.key) {
        case 'ArrowRight':
            pasarHoja();
            break;
        case 'ArrowLeft':
            anteriorHoja();
            break;
        default:
            break;
    }
}
