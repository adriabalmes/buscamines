// matriz para tabla
let matrix = [];
// matriz binaria para minas
let minas = [];
// matriz para marcar banderas
let banderas = [];
// variable minas repartidas
let minasRepartidas = 0;
// nombre del jugador para registrar
let nombreGanador = "";
// variables para temporizador()
var minutos = 0;
var segundos = 0;
var tiempo;
let puntuacionGanador;

// funcion para crear la tabla
function createTable () {
    let rows = document.getElementById("inputX").valueAsNumber;
    let columns = document.getElementById("inputY").valueAsNumber;
    let div = document.getElementById("idDIV");
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    // creamos la tabla
    for (let i = 0; i < columns; i++) {
        let fila = document.createElement("tr"); // se crea la FILA
        for (let j = 0; j < rows; j++) {
            let celda = document.createElement("td");  // se crea la CELDA
            celda.style.border = "2px solid dimgray";
            celda.style.width = "40px";
            celda.style.height = "40px";
            celda.style.paddingLeft = "0";
            celda.style.paddingTop = "0";
            celda.style.paddingRight = "0";
            celda.style.paddingBottom = "0";
            celda.style.textAlign = "center";
            celda.style.fontWeight = "bold";
            celda.style.fontSize = "1.2em";
            celda.style.backgroundColor = "lightgrey";
            celda.setAttribute("id", j); // asginamos coordenada X en ID
            celda.setAttribute("class", i); // asginamos coordenada Y en CLASS
            celda.addEventListener("click", minasAlrededor); // asignamos funcion CLICK en celda
            celda.addEventListener("contextmenu", poneBandera); // asignamos boton DCH en celda para bandera
            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
    }
    table.appendChild(tbody);
    div.appendChild(table);
    // tabla creada en matrix
    let row = document.querySelector("tbody").children;
    for (var i = 0; i < row.length; i++) {
        matrix.push(row[i].children);
    }
}

// funcion para inicializar minas
function inicialitzaMines() {
    let rows = document.getElementById("inputX").valueAsNumber;
    let columns = document.getElementById("inputY").valueAsNumber;
    let nMinas = document.getElementById("nMinas").valueAsNumber;
    minasRepartidas = 0;
    if (nMinas <= (rows*columns)){
        // inicializamos la matriz minas todo a 0
        for (let i = 0; i < columns; i++) {
            minas[i] = [];
            for (let j = 0; j < rows; j++) {
                minas[i][j] = 0;
            }
        }
        // repartimos minas en matriz minas[]
        while (minasRepartidas < nMinas) {
            let fila = Math.floor(Math.random() * (rows));
            let columna = Math.floor(Math.random() * (columns));
            if (minas[columna][fila] == 0){
                minas[columna][fila] = 1;
                //contador para minas repartidas
                minasRepartidas++;
            }
        }
        // pintamos las minas en la tabla matrix[]
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if (minas[i][j] == 1) {
                    matrix[i][j].appendChild(bomba());
                    matrix[i][j].style.backgroundColor = "red";
                }
            }
        }
        // inicializamos la matriz banderas[] toda VACÍA
        for (let i = 0; i < columns; i++) {
            banderas[i] = [];
            for (let j = 0; j < rows; j++) {
                banderas[i][j] = "";
            }
        }
    }
    temporizador();
}

// funcion para inicialiar juego 
function inicializaJuego() {
    createTable ();
    let rows = document.getElementById("inputX").valueAsNumber;
    let columns = document.getElementById("inputY").valueAsNumber;
    let nMinas = document.getElementById("nMinas").valueAsNumber;
    minasRepartidas = 0;
    if (nMinas <= (rows*columns)){
        // inicializamos la matriz minas[] todo a 0
        for (let i = 0; i < columns; i++) {
            minas[i] = [];
            for (let j = 0; j < rows; j++) {
                minas[i][j] = 0;
            }
        }
        // repartimos minas aleatoriamente en matriz minas[]
        while (minasRepartidas < nMinas){
            let fila = Math.floor(Math.random() * rows);
            let columna = Math.floor(Math.random() * columns);
            if (minas[columna][fila] == 0){
                minas[columna][fila] = 1;
                //contador para minas repartidas
                minasRepartidas++;
            }
        }
        // inicializamos la matriz banderas[] toda VACÍA
        for (let i = 0; i < columns; i++) {
            banderas[i] = [];
            for (let j = 0; j < rows; j++) {
                banderas[i][j] = "";
            }
        }
    }
    temporizador();
}

// funcion para pintar minas alrededor
function paintAllNeighbours() {
    let count;
    for (let i = 0; i < matrix.length; i++ ) { 
        for (let j = 0; j < matrix[i].length; j++) { 
            count = countNeighbours(j, i);
            if (minas[i][j] == 0){
                matrix[i][j].innerText = count;
            }
        }
    }
} 

// funcion para contar minas de alrededor
function countNeighbours(x, y) {
    let count = 0;
    for (let i = y - 1; i <= y + 1; i++) { // Y
        for (let j = x - 1; j <= x + 1; j++) { // X
            try {
                if (i==y && j==x) {
                }
                else if (minas[i][j] == 1) {
                    count++;
                }
            }
            catch {
            }
        }
    }
    return count;
}

// funcion para destapar minas de alrededor
function minasAlrededor(event) { 
    if (event.target.tagName == "TD") {
        let inputX = parseInt(event.target.id);
        let inputY = parseInt(event.target.className);
        
        for (let i = inputY - 1; i <= inputY + 1; i++) { //  Y
            for (let j = inputX - 1; j <= inputX + 1; j++) { //  X
                try {
                    count = countNeighbours(j, i);
                     if (banderas[i][j] != "B") {
                        matrix[i][j].innerText = count;
                        matrix[i][j].style.backgroundColor = "whitesmoke";
                        if (matrix[i][j].innerText == 1) {
                            matrix[i][j].style.color = "blue";
                        }
                        else if (matrix[i][j].innerText == 2) {
                            matrix[i][j].style.color = "green";
                        }
                        else if (matrix[i][j].innerText == 3) {
                            matrix[i][j].style.color = "red";
                        }
                        else if (matrix[i][j].innerText == 4 || matrix[i][j].innerText == 5 || matrix[i][j].innerText == 6 
                                || matrix[i][j].innerText == 7 || matrix[i][j].innerText == 8) {
                            matrix[i][j].style.color = "darkred";
                        }
                    }
                }
                catch {
                }
            }
        }
    }
    hasGanado();
    hasPerdido();
}

// funcion para insertar bandera
function poneBandera(event) {
    let bandera = document.createElement('img');
    bandera.src  = 'img/bandera.png';
    bandera.style.width = "100%";
    bandera.style.height = "100%";
    bandera.style.display = "flex";
    if (event.target.tagName == "TD") {
        let inputX = parseInt(event.target.id);
        let inputY = parseInt(event.target.className);
        matrix[inputY][inputX].innerText = "";
        matrix[inputY][inputX].style.backgroundColor = "whitesmoke"
        matrix[inputY][inputX].removeEventListener("click", minasAlrededor, false); 
        matrix[inputY][inputX].removeEventListener("contextmenu", poneBandera, false); 
        matrix[inputY][inputX].appendChild(bandera);
        banderas[inputY][inputX] = "B";
    }
    hasGanado();
}

// funcion para insertar bomba
function bomba() {
    let bomba = document.createElement('img');
        bomba.src  = 'img/bomba.png';
        bomba.style.width = "100%";
        bomba.style.height = "100%";
        bomba.style.display = "flex";
        return bomba;
}

// funcion para determinar que has ganado
function hasGanado() {
    let hasGanado = document.getElementById("hasGanado");
    let juegoTerminado = true;
    for (let i = 0; i < matrix.length; i++ ) { 
        for (let j = 0; j < matrix[i].length; j++) { 
            if (matrix[i][j].style.backgroundColor == "lightgrey") {
                juegoTerminado = false;
                break;
            }
        }
    }
    if (juegoTerminado) {
        hasGanado.style.display = "block";
        paintAllNeighbours();
        desactivaJuegoGanado();
        desactivaJuegoGanadoDesplegable();
        clearInterval(tiempo);
        registroGanador();
    }
}

// funcion para desactivar el juego cuando has ganado
function desactivaJuegoGanado() {
    let rows = document.getElementById("inputX").valueAsNumber;
    let columns = document.getElementById("inputY").valueAsNumber;
     // pintamos las minas en la tabla matrix[]
     for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (minas[i][j] == 1) {
                matrix[i][j].style.backgroundColor = "red";
                matrix[i][j].style.borderColor = "darkgreen";
                matrix[i][j].innerText = "";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
                matrix[i][j].appendChild(bomba());
            }
            else {
                matrix[i][j].style.backgroundColor = "lightgreen";
                matrix[i][j].style.color = "darkgreen";
                matrix[i][j].style.borderColor = "darkgreen";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
            }
        }
    }
}

// función que determina que has perdido
function hasPerdido() {
    let inputX = parseInt(event.target.id);
    let inputY = parseInt(event.target.className);
    let hasPerdido = document.getElementById("hasPerdido");
    if (minas[inputY][inputX] == 1) { 
        hasPerdido.style.display = "block";
        paintAllNeighbours();
        desactivaJuegoPerdido();
        desactivaJuegoPerdidoDesplegable();
        clearInterval(tiempo);
    }
}

// funcion para desactivar el juego cuando has perdido
function desactivaJuegoPerdido() {
    let rows = document.getElementById("inputX").valueAsNumber;
    let columns = document.getElementById("inputY").valueAsNumber;
     // pintamos las minas en la tabla matrix[]
     for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (minas[i][j] == 1) {
                matrix[i][j].style.backgroundColor = "red";
                matrix[i][j].innerText = "";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
                matrix[i][j].appendChild(bomba());
            }
            else {
                matrix[i][j].style.backgroundColor = "black";
                matrix[i][j].style.color = "white";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
            }
        }
    }
}

// funcion para crear el juego desplegable
function juegoDesplegable() {
    let valores = document.getElementById("predeterminados").value.split(":")
    let inputX = parseInt(valores[0]);
    let inputY = parseInt(valores[1]);
    let nMinas = parseInt(valores[2]);

    //CREAMOS TABLA createTable()
    let rows = inputX;
    let columns = inputY;
    let div = document.getElementById("idDIV");
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
        // creamos la tabla
        for (let i = 0; i < columns; i++) {
            let fila = document.createElement("tr"); // se crea la FILA
            for (let j = 0; j < rows; j++) {
                let celda = document.createElement("td");  // se crea la CELDA
                celda.style.border = "2px solid dimgray";
                celda.style.width = "40px";
                celda.style.height = "40px";
                celda.style.paddingLeft = "0";
                celda.style.paddingTop = "0";
                celda.style.paddingRight = "0";
                celda.style.paddingBottom = "0";
                celda.style.textAlign = "center";
                celda.style.fontWeight = "bold";
                celda.style.fontSize = "1.2em";
                celda.style.backgroundColor = "lightgrey";
                celda.setAttribute("id", j); // asginamos coordenada X en ID
                celda.setAttribute("class", i); // asginamos coordenada Y en CLASS
                celda.addEventListener("click", minasAlrededor); // asignamos funcion CLICK en celda
                celda.addEventListener("contextmenu", poneBandera); // asignamos boton DCH en celda para bandera
                fila.appendChild(celda);
            }
            tbody.appendChild(fila);
        }
        table.appendChild(tbody);
        div.appendChild(table);
        // tabla creada en matrix
        let row = document.querySelector("tbody").children;
        for (var i = 0; i < row.length; i++) {
            matrix.push(row[i].children);
        }
  
        // inicializamos la matriz minas todo a 0
        for (let i = 0; i < columns; i++) {
            minas[i] = [];
            for (let j = 0; j < rows; j++) {
                minas[i][j] = 0;
            }
        }
        // inicializamos la matriz banderas[] toda VACÍA
        for (let i = 0; i < columns; i++) {
            banderas[i] = [];
            for (let j = 0; j < rows; j++) {
                banderas[i][j] = "";
            }
        }
        // repartimos minas en matriz minas[]
        while (minasRepartidas < nMinas) {
            let fila = Math.floor(Math.random() * rows);
            let columna = Math.floor(Math.random() * columns);
            if (minas[columna][fila] == 0){
                minas[columna][fila] = 1;
                //contador para minas repartidas
                minasRepartidas++;
            }
        }
    temporizador();
}

// funcion que desactiva el juego desplegable cuando has perdido
function desactivaJuegoPerdidoDesplegable() {
    let valores = document.getElementById("predeterminados").value.split(":")
    let inputX = parseInt(valores[0]);
    let inputY = parseInt(valores[1]);
    let rows = inputX;
    let columns = inputY;
     // pintamos las minas en la tabla matrix[]
     for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (minas[i][j] == 1) {
                matrix[i][j].style.backgroundColor = "red";
                matrix[i][j].innerText = "";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
                matrix[i][j].appendChild(bomba());
            }
            else {
                matrix[i][j].style.backgroundColor = "black";
                matrix[i][j].style.color = "white";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
            }
        }
    }
}

// funcion que desactiva el juego desplegable cuando has ganado
function desactivaJuegoGanadoDesplegable() {
    let valores = document.getElementById("predeterminados").value.split(":")
    let inputX = parseInt(valores[0]);
    let inputY = parseInt(valores[1]);
    let rows = inputX;
    let columns = inputY;
     // pintamos las minas en la tabla matrix[]
     for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (minas[i][j] == 1) {
                matrix[i][j].style.backgroundColor = "red";
                matrix[i][j].style.borderColor = "darkgreen";
                matrix[i][j].innerText = "";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
                matrix[i][j].appendChild(bomba());
            }
            else {
                matrix[i][j].style.backgroundColor = "lightgreen";
                matrix[i][j].style.color = "darkgreen";
                matrix[i][j].style.borderColor = "darkgreen";
                matrix[i][j].removeEventListener("click", minasAlrededor, false); 
                matrix[i][j].removeEventListener("contextmenu", poneBandera, false); 
            }
        }
    }
}


// funcion temporizador de juego
function temporizador () {
        tiempo = setInterval(function () { 
            segundos++;
            if (segundos == 59) {
                minutos++;
                segundos = 0;
            }
            if (segundos < 10) {
                segundos = '0' + segundos; 
            }
            document.getElementById("reloj").innerHTML = minutos+':'+segundos;
            puntuacionGanador = minutos+':'+segundos;
        },1000);
}

// funcion para insertar nombre de jugador
function nombreUsuario() {
    return new Promise(resolve => {
        setTimeout(() => { 
            resolve(prompt("Introduce tu nombre"));
        });
    });
}

// funcion para registar el nombre y puntuacion del ganador
async function registroGanador () {
    let celdaNombre = document.createElement("td");
    let celdaPuntuacion = document.createElement("td");
    let fila = document.getElementById("ganador");
    let tabla = document.getElementById("ganadores");
    celdaNombre.innerHTML = await nombreUsuario();
    celdaPuntuacion.innerHTML = puntuacionGanador;
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPuntuacion);
    tabla.style.display = "block";

}

// funcion para resetear el juego
function reset() {
    location.reload();
}
