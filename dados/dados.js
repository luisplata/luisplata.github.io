function tirarDados(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

var UnD6 = function () {
    this.valor = tirarDados(1, 7);
}
var UnD10 = function () {
    this.valor = tirarDados(1, 11);
}

function generarResultadosParaCadaJugador() {
    var cantidadJugadores = document.querySelector("#cantidadJugadores").value;
    document.querySelector("#panel").innerHTML = "";
    for (let index = 0; index < cantidadJugadores; index++) {
        //1D6
        var unD6 = new UnD6();
        var dosD10 = [new UnD10(), new UnD10()]
        //construimos los paneles para cada jugador
        var div = document.createElement("div");
        div.classList.add("col");
        var ul = document.createElement("ul");
        ul.classList.add("list-group");
        /*<li class="list-group-item active">Cras justo odio</li>*/
        //este indica la ubicacion del jugador en el mapa
        var liCabeza = document.createElement("li");
        liCabeza.classList.add("list-group-item")
        liCabeza.classList.add("active")
        liCabeza.innerText = unD6.valor + " Unidades Comenzando en: " + dosD10[0].valor + "-" + dosD10[1].valor;
        ul.appendChild(liCabeza);
        div.appendChild(ul);
        document.querySelector("#panel").appendChild(div)
    }
    generarEnemigos()
}
function generarEnemigos() {
    document.querySelector("#enemigos").innerHTML = "";
    //Generador de enemigos
    var enemigo = new UnD6();
    var div = document.createElement("div");
    div.classList.add("col");
    var ul = document.createElement("ul");
    ul.classList.add("list-group");
    for (let index = 0; index < enemigo.valor; index++) {
        var enemigoUbicacion = [new UnD10(), new UnD10()]
        var liCabeza = document.createElement("li");
        liCabeza.classList.add("list-group-item")
        liCabeza.innerText = "enemigo unbicado en: x:" + enemigoUbicacion[0].valor + " y:" + enemigoUbicacion[1].valor;
        ul.appendChild(liCabeza);
    }
    div.appendChild(ul);
    document.querySelector("#enemigos").appendChild(div)


    var piedra = new UnD6();
    var div = document.createElement("div");
    div.classList.add("col");
    var ul = document.createElement("ul");
    ul.classList.add("list-group");
    for (let index = 0; index < piedra.valor; index++) {
        var piedraUbicacion = [new UnD10(), new UnD10()]
        var liCabeza = document.createElement("li");
        liCabeza.classList.add("list-group-item")
        liCabeza.innerText = "Piedras unbicadas en: x:" + piedraUbicacion[0].valor + " y:" + piedraUbicacion[1].valor;
        ul.appendChild(liCabeza);
    }
    div.appendChild(ul);
    document.querySelector("#enemigos").appendChild(div)


    var piedra = new UnD6();
    var div = document.createElement("div");
    div.classList.add("col");
    var ul = document.createElement("ul");
    ul.classList.add("list-group");
    for (let index = 0; index < piedra.valor; index++) {
        var piedraUbicacion = [new UnD10(), new UnD10()]
        var liCabeza = document.createElement("li");
        liCabeza.classList.add("list-group-item")
        liCabeza.innerText = "Arboles unbicados en: x:" + piedraUbicacion[0].valor + " y:" + piedraUbicacion[1].valor;
        ul.appendChild(liCabeza);
    }
    div.appendChild(ul);
    document.querySelector("#enemigos").appendChild(div)
    //colocar esto en
    /*
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = 'Unidad: ' + dosD10[0].valor + "-" + dosD10[1].valor;
    ul.appendChild(li);
    */
}