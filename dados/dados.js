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
        liCabeza.innerText = "Unbicado en: "+dosD10[0].valor+"-"+dosD10[1].valor;
        ul.appendChild(liCabeza);
        for (let index = 0; index < unD6.valor; index++) {
            var li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = 'Unidad: <input type="number" class="text-center" value="10" style="width: 80px;">';
            ul.appendChild(li);
        }
        div.appendChild(ul);
        document.querySelector("#panel").appendChild(div)
    }
}