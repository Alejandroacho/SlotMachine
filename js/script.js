// Elementos del DOM
const monedasDiv = document.getElementById("monedas")
const palanca = document.getElementById("palanca")
const historial = document.getElementById("historialMovimientos");
const movimientos = document.getElementById("movimientos");

// Elementos del DOM del formulario
const formulario = document.getElementById("formulario")
const botonIntroducir = document.getElementById("botonFormulario")
const inputFormulario = document.getElementById("inputFormulario")

// Elementos del DOM donde iran los resultados
const resultadoUno = document.getElementById("resultadoUno")
const resultadoDos = document.getElementById("resultadoDos")
const resultadoTres = document.getElementById("resultadoTres")

// Rutas de imagenes por default
const palancaArriba = "../img/palancaUP.png"
const palancaAbajo = "../img/palancaDOWN.png"
const imagenDefault = "../img/pingu.png"

// Imagenes de posibles resultados
const imagenes = [
  "../img/dollar.png",
  "../img/aubergine.png",
  "../img/banana.png",
  "../img/carrots.png",
  "../img/cherries.png",
  "../img/lemon.png",
  "../img/orange.png",
  "../img/peach.png",
  "../img/potato.png",
  "../img/tomato.png"
]

// Posicion de la imagen dollar en el array de imagenes
const posicionDeDollar = 0;

var monedas = 0;

init();

function init() {
  actualizarMonedas();
  actualizarPalanca();
  actualizarResultados();
  actualizarMovimientos();
}

function actualizarMonedas() {
  monedasDiv.innerText = monedas
}

function actualizarPalanca(status="Up") {
  if (status == "Up") {
    palanca.src = palancaArriba
  } else {
    palanca.src = palancaAbajo
  }
}

function actualizarMovimientos(tirada=false, descripcion) {
  if (tirada) {
    console.log("tirada");
  } else {
    historialMovimientos.hidden = true;
  }
}

function actualizarResultados (tirada=false, resultados) {
  if (tirada) {
    resultadoUno.src = imagenes[resultados[0]];
    resultadoDos.src = imagenes[resultados[1]];
    resultadoTres.src = imagenes[resultados[2]];
  } else {
    resultadoUno.src = imagenDefault;
    resultadoDos.src = imagenDefault;
    resultadoTres.src = imagenDefault;
  }
}

function tirar() {
  monedas--;
  actualizarMonedas();
  const numeroRandomUno = numeroRandom();
  const numeroRandomDos = numeroRandom();
  const numeroRandomTres = numeroRandom();
  const resultados = [numeroRandomUno, numeroRandomDos, numeroRandomTres];
  actualizarResultados(true, resultados);
}

function numeroRandom(){
  const maximo = imagenes.length - 1;
  const minimo = 0;
  const numeroRandom = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
  return numeroRandom;
}

function registrarMovimiento(concepto){
  historialMovimientos.hidden = false;
  const movimiento = document.createElement("li");
  movimiento.innerText = concepto;
  movimientos.appendChild(movimiento);
}

const tirada = palanca.addEventListener("mouseup", function() {
  actualizarPalanca();
  if (monedas > 0) {
    tirar();
  } else {
    alert("Por favor, introduce monedas.");
  }
})

palanca.addEventListener("mousedown", function() {
  actualizarPalanca("Down");
  tirada;
});

formulario.addEventListener('submit', function(event) {
  event.preventDefault();
  var input = inputFormulario.value;
  monedas = input;
  actualizarMonedas();
  inputFormulario.value = "";
  botonIntroducir.disabled = true;
  registrarMovimiento("Has introducido monedas.")
});
